import express from 'express';
import { similarProductsController, shopProductsController, singleProductController, getProductlistController } from "../controllers/productController.js"

const router = express.Router();

router.get("/singleproduct/:pname", singleProductController);
router.post("/shopproducts", shopProductsController);
router.get("/similarproducts/:sname/:cname/:pname", similarProductsController);
router.get("/getproductlist/:sname", getProductlistController);

export default router;