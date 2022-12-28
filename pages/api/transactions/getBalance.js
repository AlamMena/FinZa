// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { original } from "@reduxjs/toolkit";
import { client } from "../database/database";

export default async function getBalance(req, res) {
  await client.connect();
  try {
    const db = client.db("Finza");
    var lastMonthDate = new Date();
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    let currentMonthDate = new Date();
    lastMonthDate.setDate(1);

    const balance = await db
      .collection("transactions")
      .aggregate([
        {
          $lookup: {
            from: "accounts",
            localField: "accountId",
            foreignField: "_id",
            as: "account",
          },
        },
        {
          $unwind: {
            path: "$account",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            isDeleted: false,
            "account.isDeleted": false,
          },
        },

        {
          $group: {
            _id: { $substr: ["$date", 5, 2] },
            total: {
              $sum: { $multiply: ["$amount", "$sign"] },
            },
            income: {
              $sum: {
                $cond: [{ $eq: ["$sign", 1] }, "$amount", 0],
              },
            },
            outcome: {
              $sum: {
                $cond: [{ $eq: ["$sign", -1] }, "$amount", 0],
              },
            },
          },
        },
      ])
      .sort({ _id: -1 })
      .toArray();

    const getDiference = (newVal, oldVal) => {
      oldVal = oldVal ?? newVal;
      newVal = newVal ?? 0;

      let decrease = oldVal - newVal;
      decrease = (decrease / oldVal) * 100;
      return decrease;
    };

    const lastMonthTransactions = await db
      .collection("transactions")
      .find({ isDeleted: false })
      .project({ amount: 1, sign: 1 })
      .toArray();

    let response = {
      total: {
        value: balance[0]?.total ?? 0,
        monthDifference: getDiference(balance[0]?.total, balance[1]?.total),
        transactions: lastMonthTransactions.map((d) => d.amount),
      },
      income: {
        value: balance[0]?.income ?? 0,
        monthDifference: getDiference(balance[0]?.income, balance[1]?.income),
        transactions: lastMonthTransactions
          .filter((d) => d.sign === 1)
          .map((d) => d.amount),
      },
      outcome: {
        value: balance[0]?.outcome ?? 0,
        monthDifference: getDiference(balance[0]?.outcome, balance[1]?.outcome),
        transactions: lastMonthTransactions
          .filter((d) => d.sign === -1)
          .map((d) => d.amount),
      },
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await client.close();
}

[
  {
    month: 1,
    total: 100,
    transactions: [
      {
        value: 1,
        sign: 2,
      },
    ],
  },
  {
    month: 1,
    total: 100,
    transactions: [
      {
        value: 1,
        sign: 2,
      },
    ],
  },
];
