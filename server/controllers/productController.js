import qbDB from '../config/db.js';

export const singleProductController = async (req, res) => {
    const shpName = await req.body.shopName;
    const prodName = await req.params.pname;
    const product = await qbDB.collection('products').findOne({ name: prodName });

    if (product) {
        return res.status(200).send({ success: true, message: "success", product, shpName });
    }
    else {
        return res.status(200).send({ success: false, message: "Product does not Exist" });
    }
};

export const shopProductsController = async (req, res) => {
    const { prodLst } = await req.body;
    console.log("prdls " + JSON.stringify(req.body));
    const prodArr = await qbDB.collection('products').find({ name: { $in: prodLst } }).toArray();
    console.log("prar " + JSON.stringify(prodArr));
    // res.send(prodArr).status(200);
    res.status(200).send({
        prodArr
    })
};

export const similarProductsController = async (req, res) => {
    const cname = req.params.cname;
    const sname = req.params.sname;
    const pname = req.params.pname;
    const { prods } = await qbDB.collection('shops').findOne({ shopName: sname });
    console.log("prodsdb " + JSON.stringify(prods));
    // res.status(200).send({ prods });

    const products = await qbDB.collection('products').find({ name: { $in: prods } }).toArray();
    const nprdLst = products.filter((prd) => {
        return prd.category == cname && prd.name != pname;
    })

    console.log("np " + JSON.stringify(nprdLst));

    res.status(200).send({ prodList: nprdLst });
}


// create product

export const createProductController = async (req, res) => {
    const shopName = req.params.shopName;
    const { pName, category, desc, price, qty } = req.body;

    if (!pName) {
        return res.send({ message: "Product Name is Required" });
    } if (!category) {
        return res.send({ message: "category is Required" });
    } if (!desc) {
        return res.send({ message: "Product description is Required" });
    } if (!price) {
        return res.send({ message: "Product Price is Required" });
    } if (!qty) {
        return res.send({ message: "Product Quantity is Required" });
    }

    try {
        const nProduct = { name: pName, category, desc, image: "...", price, qty };
        const product = await qbDB.collection('products').findOne({ name: pName });
        const shop = await qbDB.collection('shops').findOne({ shopName });
        if (!(pName in shop.prods)) {
            await qbDB.collection("shops").updateOne({ shopName }, { $push: { prods: pName } })
            if (nProduct !== product) {
                await qbDB.collection('products').insertOne(nProduct);
                // const Nqty = product.qty + qty;
                // await qbDB.collection('products').update({ name: pName }, { $set: { qty: Nqty } })
            }
            return res.status(200).send({
                success: true,
                message: "Product Created"
            })
        }
        res.status(200).send({
            success: true,
            message: "Product Already Exist"
        })
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "error in product controller",
            error
        });
    }

}


// Update Product Controller

export const updateProductController = async (req, res) => {
    const shopName = req.params.shopName;
    const { pName, category, desc, price, qty, prevName } = req.body;

    if (!pName) {
        return res.send({ message: "Product Name is Required" });
    } if (!category) {
        return res.send({ message: "category is Required" });
    } if (!desc) {
        return res.send({ message: "Product description is Required" });
    } if (!price) {
        return res.send({ message: "Product Price is Required" });
    } if (!qty) {
        return res.send({ message: "Product Quantity is Required" });
    }


    try {

        const nProduct = { name: pName, category, desc, image: "...", price, qty };
        // const product = await qbDB.collection('products').updateOne({ name: pName }, { $set : {} });
        const productUpdate = await qbDB.collection('products').updateOne({ name: pName }, { $set: nProduct }, { upsert: true });

        const shop = await qbDB.collection('shops').findOne({ shopName });
        const nProds = shop.prods.filter((prod) => {
            return prod !== prevName;
        });
        nProds.push(pName);
        const shopUpdate = await qbDB.collection('shops').updateOne({ shopName }, { $set: { prods: nProds } });

        if (productUpdate || shopUpdate) {
            return res.status(200).send({
                success: true,
                message: "Product Updated successfully"
            });
        }

        // if (!(pName in shop.prods)) {
        //     await qbDB.collection("shops").updateOne({ shopName }, { $push: { prods: pName } })
        //     if (nProduct !== product) {
        //         await qbDB.collection('products').insertOne(nProduct);
        //         // const Nqty = product.qty + qty;
        //         // await qbDB.collection('products').update({ name: pName }, { $set: { qty: Nqty } })
        //     }
        //     return res.status(200).send({
        //         success: true,
        //         message: "Product Created"
        //     })
        // }
        res.status(200).send({
            success: true,
            message: "Product Already Exist"
        });

    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in product controller",
            error
        });
    }

}


// delete product from shop

export const deleteProductController = async (req, res) => {
    const shopName = req.params.shopName;
    const { pName } = req.body;

    try {
        const shop = await qbDB.collection('shops').findOne({ shopName });
        const nProds = shop.prods.filter((prod) => {
            return prod !== pName;
        });
        const shopUpdate = await qbDB.collection('shops').updateOne({ shopName }, { $set: { prods: nProds } });
        if (shopUpdate) {
            return res.status(200).send({
                success: true,
                message: "Product Deleted Successfully"
            });
        }
        res.status(200).send({
            success: false,
            message: "UnSuccessfull Product delete"
        });

    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in product controller",
            error
        });
    }
}


// get product list from shop

export const getProductlistController = async (req, res) => {
    try {
        const { sname } = req.params;
        const { prods } = await qbDB.collection('shops').findOne({ shopName: sname });

        res.status(200).send({
            prods,
            success: true,
            message: "success in getting prodlist"
        })
    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "error in getting prod list",
            error
        })
    }
}