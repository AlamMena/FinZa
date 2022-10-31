// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../database/database";

export default async function get(req, res) {
  await client.connect();
  try {
    const db = client.db("Finza");

    const { filter } = req.query;

    const transactions = await db
      .collection("transactions")
      .aggregate([
        {
          $match: {
            title: { $regex: filter ?? "", $options: "i" },
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();

    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await client.close();
}
