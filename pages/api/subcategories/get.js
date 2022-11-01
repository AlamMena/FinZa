// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../database/database";

export default async function get(req, res) {
  await client.connect();
  try {
    const db = client.db("Finza");

    const { filter } = req.query;

    const categories = await db
      .collection("subcategories")
      .find({ name: { $regex: filter ?? "", $options: "i" }, isDeleted: false })
      .toArray();

    return res.status(201).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error has occurred", errors: error });
  }
  await client.close();
}