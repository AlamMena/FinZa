import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://Alam:Alam2701@finza.q6dc0ec.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri);

