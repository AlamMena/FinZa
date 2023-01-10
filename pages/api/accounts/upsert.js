// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { client, db } from "../Database/Database";
import { letterSpacing } from "@mui/system";
import { ObjectId } from "mongodb";
import database from "../database/client";
import { getUser } from "../utils/auth";
import { GetBalance } from "../utils/balance";

export default async function Upsert(req, res) {
  try {
    const user = await getUser(req, res);
    await database.connect();

    const db = database.db("Finza");
    const accounts = db.collection("accounts");

    const { _id, name, description, isDeleted } = req.body;

    const accountExists = await accounts.findOne({
      name: name,
      _id: { $ne: new ObjectId(_id) },
      uid: user.uid,
    });

    if (accountExists) {
      return res
        .status(400)
        .json({ message: "The account name is not avaliable" });
    }

    const transactions = await db
      .collection("transactions")
      .find({ accountId: new ObjectId(_id), uid: user.uid })
      .toArray();

    const balance = GetBalance(transactions);

    let query = { _id: new ObjectId(_id) };
    let set = {
      $set: {
        uid: user.uid,
        name: name,
        description: description,
        ...balance,
        isDeleted: isDeleted ?? false,
        updatedDate: new Date(),
      },
      $setOnInsert: {
        creationDate: new Date(),
      },
    };
    let options = { upsert: true };

    await accounts.updateOne(query, set, options);

    // response
    return res.status(201).json({ message: "the accoun has been created" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error });
  }
}
