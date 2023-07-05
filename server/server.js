import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import orderRoutes from "./routes/ordersRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import cors from "cors"
// import qbDB from "./config/db.js"

dotenv.config();

const app = express();

// let shops = await qbDB.collection("shops").find({}).toArray();
// console.log("owner :" + shops[0].owner);

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);

app.get("/", (req, res) => {
    res.send({
        message: `<h1>Welcome to QuickBuy</h1>`
    })
});




app.listen(5050, () => {
    console.log(`Server running on Port 5050 `);
})