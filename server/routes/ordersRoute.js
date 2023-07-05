import express from "express";
import { getOrdersController, updataStatusController } from "../controller/ordersController.js";

const router = express.Router();

// get orders by shop
router.get("/getorders/:shopName", getOrdersController);

// update order status
// router.get("/setstatus", updataStatusController);


export default router
