import qbDB from "../config/db.js";

// get shop
export const getShopController = async (req, res) => {

    try {
        const shopName = req.params.shopName;
        const shop = await qbDB.collection("shops").findOne({ shopName });
        res.status(200).send({
            success: true,
            message: "get shop success",
            shop
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "err in category controller",
            error
        })
    }

}