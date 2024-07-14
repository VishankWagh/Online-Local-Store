import express from "express";
import dotenv from "dotenv";
// import qbdb from "./config/db.js";
// import productRoutes from "./routes/productRoute.js";
import shopRoutes from "./routes/shopRoute.js";
import productRoutes from "./routes/productRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/ordersRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import userRoutes from "./routes/userRoute.js"
// import qbDB from "./config/db.js"

dotenv.config("./.env");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
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

//routes
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/shops", shopRoutes);
app.use("/user", userRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on Port ${process.env.SERVER_PORT}`);
})