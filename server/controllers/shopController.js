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
    const page = req.params.page || 0;
    const perPage = 4;
    // console.log(pincd);
    let shopList = await qbDB.collection("shops").find({ pincode: pincd }).skip(page * perPage).limit(perPage).toArray();
    let categories = await qbDB.collection("category").find().toArray();
    // let shopList = await qbDB.collection("category").find().toArray();
    console.log("cc " + JSON.stringify(categories));
    res.send({ shopList, categories }).status(200);
};

export const singleShopController = async (req, res) => {
    const shopName = req.params.shopName;
    let shop = await qbDB.collection("shops").findOne({ shopName: shopName });
    res.send(shop).status(200);
}


// export { shoplistByAreaController, shoplistByPincodeController };


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

// get shopname 
export const getShopNameController = async (req, res) => {
    const uname = req.body.uname;
    // console.log("u " + uname);
    try {
        const shop = await qbDB.collection("shops").findOne({ uname });
        // console.log("sc " + JSON.stringify(shop));

        res.status(200).send({
            shopName: shop.shopName,
            success: true,
            message: "get shopname success"
        });

    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "err in category controller",
            error
        })
    }
}

// get shopname 
export const getDpShopNameController = async (req, res) => {
    const uname = req.body.uname;
    // console.log("u " + uname);
    try {
        const dp = await qbDB.collection("deliveryperson").findOne({ uname });
        // console.log("sc " + JSON.stringify(dp.shopName));

        res.status(200).send({
            shopName: dp.shopName,
            success: true,
            message: "get shopname success"
        });

    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "err in category controller",
            error
        })
    }
}

