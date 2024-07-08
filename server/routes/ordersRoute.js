import express from "express";
import { cancelOrderController, getDeliveredOrdersController, getOrdersByNameController, getOrdersController, placeOrderController, updataStatusController } from "../controllers/ordersController.js";

const router = express.Router();

// get orders by shop
router.get("/getorders/:shopName", getOrdersController);

// update order status
router.post("/setstatus/:id", updataStatusController);

router.post("/placeorder", placeOrderController);

router.get("/cancelorder/:oid", cancelOrderController);

router.get("/getordersbyname/:uname", getOrdersByNameController);

// get delivered orders count
router.get("/deliveredorderscount/:shopName", getDeliveredOrdersController);

export default router;
