// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "./database/database";

export default async function handler(req, res) {
  try {
    await client.connect();
    const mocvie = await db.collection("movies").findOne();
    await client.close();
    return res.status(200).json(mocvie);
  } catch (error) {
    res.status(500).json({ message: "An error has occurred" });
  }
}
