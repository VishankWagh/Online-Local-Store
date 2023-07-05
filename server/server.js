import express from "express";
import dotenv from "dotenv";
// import qbdb from "./config/db.js";
import cors from 'cors';
// import productRoutes from "./routes/productRoute.js";
import shopRoutes from "./routes/shopRoute.js";
import productRoutes from "./routes/productRoute.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// const router = express.Router();
// let docs;
// router.get("/x", async (req, res) => {
//     docs = await shopsColl.find({});
//     console.log("docs " + docs);
// })

app.get("/", (req, res) => {
    res.send({
        message: `<h1>Welcome to QuickBuy</h1>`
    })
});

app.use("/products", productRoutes);
app.use("/shops", shopRoutes);

app.listen(5050, () => {
    console.log(`Server running on Port 5050`);
})