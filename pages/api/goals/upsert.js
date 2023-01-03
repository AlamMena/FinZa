// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { letterSpacing } from "@mui/system";
import { ObjectId } from "mongodb";
import database from "../database/client";
import { getUser } from "../utils/auth";
import { GetBalance } from "../utils/Balance";

export default async function Upsert(req, res) {
  try {
    const user = await getUser(req, res);

    await database.connect();

    const db = database.db("Finza");
    const goals = db.collection("goals");

    const {
      _id,
      title,
      description,
      amount,
      initialDate,
      finalDate,
      isDeleted,
    } = req.body;

    const goalExists = await goals.findOne({
      _id: { $ne: new ObjectId(_id) },
      title: title,
    });

    if (goalExists) {
      return res
        .status(400)
        .json({ message: "The goal title is not avaliable" });
    }

    let query = { _id: new ObjectId(_id) };

    let balance = {
      income: 0,
      outcome: 0,
      balance: 0,
    };
    if (_id) {
      const goal = await db
        .collection("goals")
        .findOne({ _id: new ObjectId(_id), isDeleted: false });

      balance = GetBalance(goal.transactions);
    }
    let set = {
      $set: {
        uid: user.uid,
        title: title,
        initialDate,
        finalDate,
        description: description,
        amount: amount,
        ...balance,
        isDeleted: isDeleted ?? false,
        updatedDate: new Date(),
        uid: user.uid,
      },
      $setOnInsert: {
        creationDate: new Date(),
        transactions: [],
      },
    };
    let options = { upsert: true };

    await goals.updateOne(query, set, options);

    // closing connection
    await database.close();

    // response
    return res.status(201).json({ message: "the goal has been created" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error });
  }
}
