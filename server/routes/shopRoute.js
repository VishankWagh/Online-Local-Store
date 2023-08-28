import express from 'express';
import { getDpShopNameController, getShopController, getShopNameController, shoplistByPincodeController, singleShopController } from '../controllers/shopController.js';

//  shoplistByAreaController
const router = express.Router();

// router.get("/shoplistbyarea/:area", shoplistByAreaController);
router.get("/shoplistbypincode/:pincode/:page", shoplistByPincodeController);
router.get("/singleshop/:shopName", singleShopController);

// get shop
router.get("/getshop/:shopName", getShopController);

// get shop Name
router.post("/getshopName", getShopNameController);

// get dpsshop Name
router.post("/getdpshopname", getDpShopNameController);


export default router;