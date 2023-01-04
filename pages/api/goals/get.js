// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import database from "../database/client";
import { getUser } from "../utils/auth";
import { GetBalance } from "../utils/balance";

export default async function Get(req, res) {
  try {
    const user = await getUser(req, res);

    await database.connect();

    const db = database.db("Finza");

    const { filter, status } = req.query;

    const statusCondition =
      status === "all"
        ? { isCompleted: { $in: [true, false] } }
        : status === "completed"
        ? { isCompleted: true }
        : { isCompleted: false };

    const goals = await db
      .collection("goals")
      .aggregate([
        {
          $match: {
            title: { $regex: filter ?? "", $options: "i" },
            ...statusCondition,
            isDeleted: false,
            uid: user.uid,
          },
        },
      ])
      .toArray();
    return res.status(200).json(goals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await database.close();
}
