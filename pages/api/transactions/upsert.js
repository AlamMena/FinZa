// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { letterSpacing } from "@mui/system";
import { ObjectId } from "mongodb";
import { client } from "../database/database";

export default async function upsert(req, res) {
  try {
    // connecting to mongo
    await client.connect();

    const db = client.db("Finza");
    const transactions = db.collection("transactions");
    const categories = db.collection("categories");

    const { _id, category, sign, title, description, amount, date, isDeleted } =
      req.body;

    const categoryExists = await categories.findOne({
      _id: new ObjectId(category._id),
      isDeleted: false,
    });
    if (!categoryExists) {
      return res.status(400).send({ message: "Invalid category" });
    }
    let query = { _id: new ObjectId(_id) };
    let set = {
      $set: {
        title: title,
        categoryId: new ObjectId(category._id),
        date: date ?? new Date(),
        description: description,
        amount: amount,
        sign: sign,
        isDeleted: isDeleted ?? false,
        updatedDate: new Date(),
      },
      $setOnInsert: {
        creationDate: new Date(),
      },
    };
    let options = { upsert: true };

    await transactions.updateOne(query, set, options);

    // closing connection
    await client.close();

    // response
    return res
      .status(201)
      .json({ message: "the subcategory has been created" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error });
  }
}
