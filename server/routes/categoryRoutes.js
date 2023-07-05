import express from "express";
import { getShopController } from "../controller/categoryController.js";

const router = express.Router();

// get orders by shop
// router.post("/addcategory/:categoryName/:shopName", postCategoryController);

// get shop
router.post("/getshop/:shopName", getShopController);

export default router;