import { ObjectId } from "mongodb";
import qbDB from "../config/db.js";

// get orders by shop controller
export const getOrdersController = async (req, res) => {

    try {
        const shopName = req.params.shopName;
        const orders = await qbDB.collection("orders").find({ shopName }).toArray();
        res.status(200).send({
            success: true,
            message: "get orders success",
            orders
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "err in orders controller",
            error
        })
    }

}

// update order status
export const updataStatusController = async (req, res) => {
    try {
        // const status = req.params.status;
        // const _id = ObjectId(req.params.oid);
        const status = "delivered";
        const _id = ObjectId('64892e97384f7a5496dee3f0');

        console.log("status " + status + " id " + _id);
        // await qbDB.collection("orders").update({ _id }, { $set: { status } });
        res.status(200).send({
            success: true,
            message: "Order status Updated"
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "error in order controller",
            error
        })
    }
}