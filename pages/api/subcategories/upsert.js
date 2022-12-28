// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { letterSpacing } from "@mui/system";
import { ObjectId } from "mongodb";
import database from "../database/database";

export default async function upsert(req, res) {
  try {
    // connecting to mongo
    await database.connect();

    const db = database.db("Finza");
    const subcategories = db.collection("subcategories");
    const categories = db.collection("categories");

    const { _id, name, description, category, isDeleted } = req.body;

    const subcategoryExists = await subcategories.findOne({
      name: name,
      _id: { $ne: new ObjectId(_id) },
    });

    if (subcategoryExists) {
      return res
        .status(400)
        .json({ message: "The subcategory name is not avaliable" });
    }

    const categoryExists = await categories.findOne({
      _id: new ObjectId(category._id),
      isDeleted: false,
    });
    if (!categoryExists) {
      return res
        .status(400)
        .json({ message: "The categoryId is not avaliable" });
    }

    let query = { _id: new ObjectId(_id) };
    let set = {
      $set: {
        category: category,
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

    await subcategories.updateOne(query, set, options);

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
