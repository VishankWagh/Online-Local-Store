import qbDB from "../config/db.js";

export const addCategoryController = async (req, res) => {
    // const categoryName = req.body.categoryName;
    const { categoryName, shopName } = req.body;
    const catExists = await qbDB.collection("category").findOne({ name: categoryName });
    const shpcatExists = await qbDB.collection("shops").find({ categories: { $in: [categoryName] } })
    // if (!catExists) {
    //     await qbDB.collection("category").insertOne({ name: categoryName });
    //     // res.status(200).send({
    //     //     success: true,
    //     //     message: "Category added to category"
    //     // })
    // }

    if (!shpcatExists) {
        qbDB.collection("shops").update(
            { shopName },
            {
                $push: {
                    categories: {
                        $each: [categoryName],
                        $position: 0
                    }
                }
            });
        res.status(200).send({
            success: true,
            message2: "Category added to shop"
        })
    }
}

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