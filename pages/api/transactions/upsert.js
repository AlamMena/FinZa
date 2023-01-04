// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { letterSpacing } from "@mui/system";
import { ObjectId } from "mongodb";
import database from "../database/client";
import { getUser } from "../utils/auth";
import { GetBalance } from "../utils/balance";
import getBalance from "./getBalance";

export default async function upsert(req, res) {
  try {
    const user = await getUser(req, res);

    await database.connect();

    const db = database.db("Finza");
    const transactions = db.collection("transactions");
    const accounts = db.collection("accounts");
    const goals = db.collection("goals");

    let {
      _id,
      account,
      sign,
      title,
      description,
      amount,
      goals: transactionGoals,
      date,
      isDeleted,
    } = req.body;

    account = await accounts.findOne({
      _id: new ObjectId(account._id),
      isDeleted: false,
    });

    if (!account) {
      return res.status(400).send({ message: "Invalid account" });
    }
    let query = { _id: new ObjectId(_id) };

    const transaction = {
      uid: user.uid,
      title: title,
      accountId: new ObjectId(account._id),
      date: date ? new Date(date) : new Date(),
      description: description,
      amount: amount,
      goals: transactionGoals ?? [],
      sign: sign,
      isDeleted: isDeleted ?? false,
      updatedDate: new Date(),
    };
    const setTransasction = {
      $set: transaction,
      $setOnInsert: {
        creationDate: new Date(),
      },
    };

    let options = { upsert: true };

    await transactions.updateOne(query, setTransasction, options);
    const accountTransactions = await db
      .collection("transactions")
      .find({
        accountId: new ObjectId(account._id),
        isDeleted: false,
        uid: user.uid,
      })
      .toArray();

    const accountBalance = GetBalance(accountTransactions);
    console.log(accountBalance);
    await db.collection("accounts").updateOne(
      {
        _id: new ObjectId(account._id),
        isDeleted: false,
        uid: user.uid,
      },
      { $set: { ...accountBalance } }
    );

    const goalsToUpdate = await goals
      .find({
        _id: {
          $in:
            transactionGoals?.length > 0
              ? transactionGoals.map((goal) => new ObjectId(goal._id))
              : [],
        },
      })
      .toArray();

    for (const goal of goalsToUpdate) {
      const transactionExists = goal.transactions.map(
        (t) => t._id.toString() === _id
      );

      let newTransactions = goal.transactions;
      if (transactionExists) {
        newTransactions = goal.transactions.filter(
          (t) => t._id.toString() !== _id
        );
      }
      newTransactions.push({ _id: new ObjectId(_id), ...transaction });

      const balance = GetBalance(newTransactions);
      await goals.updateOne(
        { _id: new ObjectId(goal._id) },
        {
          $set: {
            transactions: newTransactions,
            ...balance,
            isCompleted: balance.balance >= goal.amount,
          },
        }
      );
    }

    // closing connection
    await database.close();

    // response
    return res
      .status(201)
      .json({ message: "the transaction has been created" });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ message: error });
  }
}
