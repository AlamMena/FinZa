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
    const goals = db.collection("goals");

    const {
      _id,
      title,
      description,
      amount,
      initialDate,
      finalDate,
      isDeleted,
    } = req.body;

    const goalExists = await goals.findOne({
      _id: { $ne: new ObjectId(_id) },
      title: title,
      description: description,
      amount: amount,
    });

    if (goalExists) {
      return res
        .status(400)
        .json({ message: "The goal name is not avaliable" });
    }

    let query = { _id: new ObjectId(_id) };
    console.log(initialDate);
    let set = {
      $set: {
        title: title,
        initialDate,
        finalDate,
        description: description,
        amount: amount,
        isDeleted: isDeleted ?? false,
        updatedDate: new Date(),
      },
      $setOnInsert: {
        creationDate: new Date(),
      },
    };
    let options = { upsert: true };

    await goals.updateOne(query, set, options);

    // closing connection
    await database.close();

    // response
    return res.status(201).json({ message: "the goal has been created" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error });
  }
}
