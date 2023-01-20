import { MongoClient, ServerApiVersion } from "mongodb";
// const uri = "mongodb://localhost:27017";
const uri =
  "mongodb+srv://Finza:Alam2701@finza.xnlmjkn.mongodb.net/?retryWrites=true&w=majority";

let clientPromise;

export default new MongoClient(uri);
