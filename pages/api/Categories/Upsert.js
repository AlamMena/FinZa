// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client, db } from "../Database/Database";

export default async function handler(req, res) {
  try {
    await client.connect();
    const categories = db.collection("categories");
    await categories.insertOne({
      name: "Food",
      description: "food category",
    });

    await client.close();
    return res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: "An error has occurred" });
  }
}
