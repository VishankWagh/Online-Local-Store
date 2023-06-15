import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: '../../.env' });

let qbDB;

async function main() {
    const uri = process.env.MongoUrl;

    const client = new MongoClient(uri);

    try {
        const conn = await client.connect();
        // await  listDatabases(client);
        // const databasesList = await client.db().admin().listDatabases();
        qbDB = conn.db("onlineLocalStore");
        // let shops = await qbDB.collection("shops").find({}).toArray();
        // // console.log("owner :" + owner);

        // shops.forEach(shop => {
        //     console.log("s " + shop.owner);
        // });

        // databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    } catch (e) {
        console.error(e);
    } finally {
        // await client.close();
    }
}

main().catch(console.error);

export default qbDB;