// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectToDatabase } from "../Database/Database";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  try {
    const categories = await db
      .collection("categories")
      .find()
      .limit(2)
      .toArray();
    return res.status(201).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
}
