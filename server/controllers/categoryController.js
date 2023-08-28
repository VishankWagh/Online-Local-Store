import qbDB from "../config/db.js";

export const addCategoryController = async (req, res) => {
    // const categoryName = req.body.categoryName;
    const { categoryName, shopName } = req.body;

    try {

        const shop = await qbDB.collection('shops').findOne({ shopName });
        shop.categories.push(categoryName);

        const catUpdate = await qbDB.collection("shops").updateOne({ shopName }, { $set: { categories: shop.categories } });

        if (catUpdate) {
            res.status(200).send({
                success: true,
                message: "Category added to shop"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "cannot add"
            });
        }


    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "error in product controller",
            error
        });
    }
}

// delete category from shop

export const deleteCategoryController = async (req, res) => {
    // const categoryName = req.body.categoryName;
    const { categoryName, shopName } = req.body;

    try {

        const shop = await qbDB.collection('shops').findOne({ shopName });
        // shop.categories.push(categoryName);
        const nCat = shop.categories.filter((cat) => {
            return cat !== categoryName;
        });

        const catUpdate = await qbDB.collection("shops").updateOne({ shopName }, { $set: { categories: nCat } });

        if (catUpdate) {
            res.status(200).send({
                success: true,
                message: "Category deleted from shop"
            });
        }
        else {
            res.status(200).send({
                success: true,
                message: "cannot delete"
            });
        }


    }
    catch (error) {
        res.status(400).send({
            success: false,
            message: "error in product controller",
            error
        });
    }
}

// get category list from shop

export const getCategorylistController = async (req, res) => {
    try {
        const { sname } = req.params;
        const { categories } = await qbDB.collection('shops').findOne({ shopName: sname });

        res.status(200).send({
            categories,
            success: true,
            message: "success in getting categorylist"
        })
    }
    catch {
        res.status(400).send({
            success: false,
            message: "error in getting category list"
        })
    }
}

// get all categories

export const getAllCategoriesController = async (req, res) => {
    try {
        let categories = await qbDB.collection('category').find({}).toArray();
        categories = categories.map((cat) => {
            return cat.name
        });
        // console.log("allcat " + categories);
        res.status(200).send({
            categories,
            success: true,
            message: "success in getting categorylist"
        })
    }
    catch {
        res.status(400).send({
            success: false,
            message: "error in getting category list"
        })
    }
}