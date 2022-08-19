import { MongoClient } from "mongodb";

// Connection URI
const uri =
  "mongodb+srv://Alam:Alam2701@cluster0.cf05i1x.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

const db = client.db("FinZa");

export { client, db };
