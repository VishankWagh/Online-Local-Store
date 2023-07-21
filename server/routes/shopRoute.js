import express from 'express';
import { getShopController, shoplistByPincodeController, singleShopController } from '../controllers/shopController.js';

//  shoplistByAreaController
const router = express.Router();

// router.get("/shoplistbyarea/:area", shoplistByAreaController);
router.get("/shoplistbypincode/:pincode", shoplistByPincodeController);
router.get("/singleshop/:shopName", singleShopController);

// get shop
router.get("/getshop/:shopName", getShopController);

export default router;