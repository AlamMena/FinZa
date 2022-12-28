// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { letterSpacing } from "@mui/system";
import { ObjectId } from "mongodb";
import database from "../database/client";

export default async function Upsert(req, res) {
  try {
    // connecting to mongo
    await database.connect();

    const db = database.db("Finza");
    const accounts = db.collection("accounts");

    const { _id, name, description, isDeleted } = req.body;

    const accountExists = await accounts.findOne({
      name: name,
      _id: { $ne: new ObjectId(_id) },
    });

    if (accountExists) {
      return res
        .status(400)
        .json({ message: "The account name is not avaliable" });
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

    await accounts.updateOne(query, set, options);

    // closing connection
    await database.close();

    // response
    return res.status(201).json({ message: "the accoun has been created" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error });
  }
}
