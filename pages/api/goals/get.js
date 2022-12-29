// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import client from "../database/client";

export default async function Get(req, res) {
  await client.connect();
  try {
    const db = client.db("Finza");

    const { filter } = req.query;

    const goals = await db
      .collection("goals")
      .aggregate([
        {
          $match: {
            title: { $regex: filter ?? "", $options: "i" },
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
            title: 1,
            initialDate: 1,
            finalDate: 1,
            amount: 1,
            isDeleted: 1,
            transactions: 1,
          },
        },
      ])
      .toArray();

    const response = goals.map((goal) => {
      return {
        _id: goal._id,
        title: goal.title,
        initialDate: goal.initialDate,
        finalDate: goal.finalDate,
        amount: goal.amount,
        balance:
          goal.transactions
            .filter((d) => d.isDeleted === false)
            .reduce((prev, curr) => prev + curr.amount * curr.sign, 0) ?? 0,
        income: goal.transactions
          .filter((d) => d.sign === 1 && d.isDeleted === false)
          .reduce((prev, curr) => prev + curr.amount, 0),
        outcome: goal.transactions
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
