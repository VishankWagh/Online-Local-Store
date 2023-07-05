import express from 'express';
import { shoplistByPincodeController, singleShopController } from '../controllers/shopController.js';
//  shoplistByAreaController
const router = express.Router();

// router.get("/shoplistbyarea/:area", shoplistByAreaController);
router.get("/shoplistbypincode/:pincode", shoplistByPincodeController);
router.get("/singleshop/:shopName", singleShopController);

export default router;