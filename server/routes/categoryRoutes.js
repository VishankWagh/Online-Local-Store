import express from "express";
import { addCategoryController, deleteCategoryController, getAllCategoriesController, getCategorylistController } from "../controllers/categoryController.js";

const router = express.Router();

// get orders by shop
// router.post("/addcategory/:categoryName/:shopName", postCategoryController);

// add category from shop
router.post("/addcategory", addCategoryController);

// delete category from shop
router.post("/deletecategory", deleteCategoryController);

// get category list from shop
router.get("/getcategorylist/:sname", getCategorylistController);

// get all categories
router.get("/getallcategories", getAllCategoriesController);

export default router;