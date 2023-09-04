import express from 'express';
import { similarProductsController, shopProductsController, singleProductController, createProductController, updateProductController, deleteProductController, getProductlistController, addReviewController } from "../controllers/productController.js"

const router = express.Router();

router.get("/singleproduct/:pname", singleProductController);
router.post("/shopproducts", shopProductsController);
router.get("/similarproducts/:sname/:cname/:pname", similarProductsController);

// create product route
router.post("/:shopName/create", createProductController);

// update procut route
router.post("/updateproduct/:shopName", updateProductController);

// delete product from shop route
router.post("/deleteproduct/:shopName", deleteProductController);

// get product list from shop
router.get("/getproductlist/:sname", getProductlistController);

router.post("/addreview/:pname", addReviewController);

export default router;