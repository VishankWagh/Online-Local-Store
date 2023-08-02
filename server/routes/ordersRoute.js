import express from "express";
import { getOrdersController, updataStatusController } from "../controllers/ordersController.js";

const router = express.Router();

// get orders by shop
router.get("/getorders/:shopName", getOrdersController);

// update order status
router.post("/setstatus/:id", updataStatusController);


export default router
