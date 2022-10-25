// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { letterSpacing } from "@mui/system";
import { ObjectId } from "mongodb";
import { client } from "../database/database";

export default async function handler(req, res) {
  try {
    // connecting to mongo
    await client.connect();

    const db = client.db("Finza");
    const categories = db.collection("categories");

    const { _id, name, description, isDeleted } = req.body;

    const categoryExists = await categories.findOne({
      name: name,
      _id: { $ne: new ObjectId(_id) },
    });

    if (categoryExists) {
      return res
        .status(400)
        .json({ message: "The category name is not avaliable" });
    }

    let query = { _id: new ObjectId(_id) };
    let set = {
      $set: {
        name: name,
        description: description,
        profit: 0,
        loss: 0,
        balance: 0,
        isDeleted: isDeleted ?? false,
        updatedDate: new Date(),
      },
      $setOnInsert: {
        creationDate: new Date(),
      },
    };
    let options = { upsert: true };

    await categories.updateOne(query, set, options);

    // closing connection
    await client.close();

    // response
    return res.status(201).json({ message: "the category has been created" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error });
  }
}
