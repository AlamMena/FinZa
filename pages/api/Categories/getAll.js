// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../Database/Database";

export default async function handler(req, res) {
  const connection = await client.connect();
  console.log(connection)
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
