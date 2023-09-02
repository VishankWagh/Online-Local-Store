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
        // const status = "delivered";
        // const _id = ObjectId('64892e97384f7a5496dee3f0');

        const status = req.body.status;
        const id = req.params.id;
        console.log("status " + req.body.status);
        console.log("id " + id);
        await qbDB.collection("orders").update({ orderId: id }, { $set: { status: status } });
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

// place order
export const placeOrderController = async (req, res) => {
    try {
        console.log("plccntrlr");
        let uname = req.uname;
        let fName = "Vishank";
        let lName = "Wagh";

        let ordDoc = await qbDB.collection("orders").findOne({ name: "orderId" });
        let ordId = +ordDoc.currId + 1;
        console.log("oid " + JSON.stringify(ordDoc));
        await qbDB.collection("orders").updateOne({ name: "orderId" }, { $set: { currId: ordId } })

        await qbDB.collection("orders").insertOne({
            orderId: ordId,
            name: fName + " " + lName,
            address: req.body.address,
            products: req.body.plcordcrt,
            subTotal: req.body.subtotal,
            deliveryCharge: req.body.delchrg,
            paymentMode: req.body.pymm,
            shopName: req.body.shopName,
            status: "pending"
        });

        res.status(200).send({
            ordId,
            success: true,
            message: "Order placed order"
        })
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: "error in place order controller",
            err
        })
    }
}

export const cancelOrderController = async (req, res) => {
    try {
        const ordId = parseInt(req.params.oid);
        const ordDoc = await qbDB.collection('orders').findOne({ "orderId": ordId });
        if (ordDoc.status !== "pending") {
            return res.status(201).send({
                success: false,
                message: "Order cannot be cancelled now"
            })
        }
        console.log("vs " + ordId);

        qbDB.collection("orders").deleteOne({ "orderId": ordId });

        res.status(200).send({
            success: true,
            message: "Order canceled"
        })
    }
    catch {
        res.status(400).send({
            success: false,
            message: "Error in canceling order"
        })
    }
}

export const getOrdersByNameController = async (req, res) => {
    try {
        const name = req.params.name;

        const orderList = await qbDB.collection("orders").find({ name }).toArray();

        res.status(200).send({
            orderList,
            success: true,
            message: "Order list recieved"
        })
    }
    catch {
        res.status(400).send({
            success: false,
            message: "Error in fetching orderlist"
        })
    }
}

// get number of delivered order 

export const getDeliveredOrdersController = async (req, res) => {
    try {
        const { shopName } = req.params;
        const orders = await qbDB.collection("orders").find({ shopName }).toArray();
        const dOrdersLength = orders.filter((o) => {
            return o.status === "delivered"
        }).length;

        if (!dOrdersLength) {
            res.status(200).send({
                success: false,
                message: "No Delivered Orders"
            });
        }
        res.status(200).send({
            success: true,
            dOrdersLength
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in order controller"
        })
    }
}