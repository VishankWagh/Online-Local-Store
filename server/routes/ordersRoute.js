import express from "express";
import { cancelOrderController, getOrdersByNameController, getOrdersController, placeOrderController, updataStatusController } from "../controllers/ordersController.js";

const router = express.Router();

// get orders by shop
router.get("/getorders/:shopName", getOrdersController);

// update order status
// router.get("/setstatus", updataStatusController);

router.post("/placeorder", placeOrderController);

router.get("/cancelorder/:oid", cancelOrderController);

router.get("/getordersbyname/:name", getOrdersByNameController);

export default router;
