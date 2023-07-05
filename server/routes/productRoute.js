import express from 'express';
import { similarProductsController, shopProductsController, singleProductController } from "../controllers/productController.js"

const router = express.Router();

router.get("/singleproduct/:pname", singleProductController);
router.post("/shopproducts", shopProductsController);
router.get("/similarproducts/:sname/:cname/:pname", similarProductsController);

export default router;