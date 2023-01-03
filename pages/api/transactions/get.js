// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import database from "../database/client";
import { getUser } from "../utils/auth";

export default async function get(req, res) {
  try {
    const user = await getUser(req, res);

    await database.connect();

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
            uid: user.uid,
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

    await database.close();

    return res.status(200).json(transactions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error has occurred", errors: error });
  }
}
