import qbDB from '../config/db.js';

export const singleProductController = async (req, res) => {
    const shpName = await req.body.shopName;
    const prodName = await req.params.pname;
    const product = await qbDB.collection('products').findOne({ name: prodName });
    res.status(200).send({ product, shpName });
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