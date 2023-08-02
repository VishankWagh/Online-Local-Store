import express from "express";
import { addCategoryController, getCategorylistController } from "../controllers/categoryController.js";

const router = express.Router();

// get orders by shop
router.post("/addcategory", addCategoryController);

router.get("/getcategorylist/:sname", getCategorylistController);


export default router;