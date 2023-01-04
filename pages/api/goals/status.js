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

    const goals = await db
      .collection("goals")
      .aggregate([
        {
          $match: {
            title: { $regex: filter ?? "", $options: "i" },
            isDeleted: false,
            uid: user.uid,
          },
        },
      ])
      .toArray();

    const completedGoals =
      goals.filter((goal) => goal.isCompleted)?.length ?? 0;
    const pendingGoals = goals.filter((goal) => !goal.isCompleted)?.length ?? 0;

    const response = {
      completed: completedGoals,
      pending: pendingGoals,
      all: goals.length,
      statusPercentage:
        goals.length === 0 || goals.length === completedGoals
          ? 100
          : ((completedGoals / goals.length) * 100).toFixed(2),
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await database.close();
}
