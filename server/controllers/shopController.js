import qbDB from '../config/db.js';

// let shops = await qbDB.collection("shops").find({}).toArray();
// console.log("owner :" + shops[0].owner);

// export const shoplistByAreaController = async (req, res) => {
//     const area = req.params.area;
//     console.log("ara " + area);
//     let shopList = await qbDB.collection("shops").find({ area }).toArray();
//     let categories = await qbDB.collection("category").find().toArray();
//     // let shopList = await qbDB.collection("category").find().toArray();
//     console.log("controller" + JSON.stringify(shopList));
//     res.send({ shopList: shopList, categories: categories }).status(200);
// };

export const shoplistByPincodeController = async (req, res) => {
    const pincd = parseInt(req.params.pincode);
    console.log(pincd);
    let shopList = await qbDB.collection("shops").find({ pincode: pincd }).toArray();
    let categories = await qbDB.collection("category").find().toArray();
    // let shopList = await qbDB.collection("category").find().toArray();
    console.log("controller" + JSON.stringify(shopList));
    res.send({ shopList: shopList, categories: categories }).status(200);
};

export const singleShopController = async (req, res) => {
    const shopName = req.params.shopName;
    let shop = await qbDB.collection("shops").findOne({ shopName: shopName });
    res.send(shop).status(200);
}


// export { shoplistByAreaController, shoplistByPincodeController };