// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { client } from "../database/database";

export default async function handler(req, res) {
  try {
    // connecting to mongo
    await client.connect();

    const db = client.db("FinZa");
    const categories = db.collection("categories");

    const { name, description } = req.body;

    const categoryExists = await categories.findOne({ name: name });

    if (categoryExists) {
      return res
        .status(400)
        .json({ message: "The category name is not avaliable" });
    }

    await categories.insertOne({
      name: name,
      description: description,
    });

    // closing connection
    await client.close();

    // response
    return res.status(201).json({ message: "the category has been created" });
  } catch (error) {
    return res.status(500).json({ message: "An error has occurred" });
  }
}
