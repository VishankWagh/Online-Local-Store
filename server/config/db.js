import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });

let qbDB;

// async function main() {
const uri = process.env.MongoUrl;

const client = new MongoClient("mongodb+srv://admin-vsw:vswadmin@cluster0.99d6gcn.mongodb.net/?retryWrites=true&w=majority");

try {
    const conn = await client.connect();
    // await  listDatabases(client);
    // const databasesList = await client.db().admin().listDatabases();
    qbDB = conn.db("onlineLocalStore");
    // console.log(qbDB);
    // let shops = await qbDB.collection("shops").find({}).toArray();
    // console.log("owner :" + shops[0].owner);

    // shops.forEach(shop => {
    //     console.log("s " + shop.owner);
    // });

    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));

} catch (e) {
    console.error(e);
} finally {
    // await client.close();
}
// }

//main().catch(console.error);

export default qbDB;