import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//
import shopsColl from "./config/db.js";
const router = express.Router();
let docs;
router.get("/x", async (req, res) => {
    docs = await shopsColl.find({});
    console.log("docs " + docs);
})
//

app.get("/", (req, res) => {
    res.send({
        message: `<h1>Welcome to QuickBuy</h1>`
    })
});




app.listen(5050, () => {
    console.log(`Server running on Port 5050 ${docs}`);
})