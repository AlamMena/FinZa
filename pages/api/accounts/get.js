// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import database from "../database/database";

export default async function Get(req, res) {
  await database.connect();
  try {
    const db = client.db("Finza");

    const { filter } = req.query;

    const accounts = await db
      .collection("accounts")
      .aggregate([
        {
          $match: {
            name: { $regex: filter ?? "", $options: "i" },
            isDeleted: false,
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
        lastTransactionDate:
          account.transactions
            .filter((d) => d.isDeleted === false)
            .map((d) => d.date)
            .sort((a, b) => new Date(a) - new Date(b)) //sorting desc date
            .slice(-1)[0] ?? new Date() /* getting last array value */,

        balance: account.transactions
          .filter((d) => d.isDeleted === false)
          .reduce((prev, curr) => prev + curr.amount * curr.sign, 0),
        income: account.transactions
          .filter((d) => d.sign === 1 && d.isDeleted === false)
          .reduce((prev, curr) => prev + curr.amount, 0),
        outcome: account.transactions
          .filter((d) => d.sign === -1 && d.isDeleted === false)
          .reduce((prev, curr) => prev + curr.amount, 0),
      };
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await client.close();
}
