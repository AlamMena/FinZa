// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import database from "../database/client";

export default async function get(req, res) {
  await database.connect();
  try {
    const db = database.db("Finza");

    const { filter } = req.query;

    const transactions = await db
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
          $match: {
            title: { $regex: filter ?? "", $options: "i" },
            isDeleted: false,
            "account.isDeleted": false,
          },
        },
        {
          $unwind: {
            path: "$account",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .sort({ date: -1 })
      .toArray();

    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await client.close();
}
