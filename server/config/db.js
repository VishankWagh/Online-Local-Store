import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });

const client = new MongoClient("mongodb+srv://admin-vsw:vswadmin@cluster0.99d6gcn.mongodb.net/?retryWrites=true&w=majority");
let conn;

try {
    conn = await client.connect();
    console.log("connected to db");
    // await  listDatabases(client);
    // const databasesList = await client.db().admin().listDatabases();
    // qbDB = conn.db("onlineLocalStore");

    // shops = await qbDB.collection("shops").find({}).toArray();
    // console.log("owner :" + shops);

    // shops.forEach(shop => {
    //     console.log("s " + shop.owner);
    // });

    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));

} catch (e) {
    console.error(e);
} finally {
    // await client.close();
}

let qbDB = conn.db("onlineLocalStore");

export default qbDB;