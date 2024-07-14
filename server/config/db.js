import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: './.env' });

let qbDB;

const client = new MongoClient(process.env.MONGO_URI);

try {
    const conn = await client.connect();
    qbDB = conn.db("onlineLocalStore");

} catch (e) {
    console.error(e);
}

export default qbDB;