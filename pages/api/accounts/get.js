// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import database from "../database/client";
import { getUser } from "../utils/auth";
import { GetBalance } from "../utils/balance";

export default async function Get(req, res) {
  try {
    const user = await getUser(req, res);

    await database.connect();

    const db = database.db("Finza");

    const { filter } = req.query;

    const accounts = await db
      .collection("accounts")
      .aggregate([
        {
          $match: {
            name: { $regex: filter ?? "", $options: "i" },
            isDeleted: false,
            uid: user.uid,
          },
        },
        {
          $lookup: {
            from: "transactions",
            localField: "_id",
            foreignField: "accountId",
            as: "transactions",
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            income: 1,
            outcome: 1,
            balance: 1,
            isDeleted: 1,
            transactions: 1,
          },
        },
      ])
      .toArray();

    const response = accounts.map((account) => {
      return {
        _id: account._id,
        name: account.name,
        income: account.income,
        outcome: account.outcome,
        balance: account.balance,
        lastTransactionDate:
          account.transactions
            .filter((d) => d.isDeleted === false)
            .map((d) => d.date)
            .sort((a, b) => new Date(a) - new Date(b)) //sorting desc date
            .slice(-1)[0] ?? new Date() /* getting last array value */,
      };
    });
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await database.close();
}
