import { MongoClient, ServerApiVersion } from "mongodb";
// const uri = "mongodb://localhost:27017";
// ;
const uri =
  "mongodb+srv://Alam:Alam2701@cluster0.cf05i1x.mongodb.net/?retryWrites=true&w=majority";

export default client = new MongoClient(uri);
