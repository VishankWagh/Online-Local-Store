import express from "express";
import { cregisterController, dregisterController, forgotPasswordController, getHashPasswordController, loginController, sregisterController } from "../controllers/authController.js";
import { isCustomer, isDPerson, isMerchant, requireSignIn } from "../middlewaares/authMiddleware.js";

const router = express.Router();

// customer register
router.post("/c-register", cregisterController);

// shop register
router.post("/s-register", sregisterController);

// delivery person register
router.post("/d-register", dregisterController);

// User Login
router.post("/login/:user", loginController);

// protected route auth merchant
router.get("/user-auth/merchant", isMerchant, (req, res) => {
    res.status(200).send({ ok: true });
});

// protected route auth customer
router.get("/user-auth/customer", isCustomer, (req, res) => {
    res.status(200).send({ ok: true });
});

// protected route auth customer
router.get("/user-auth/dperson", isDPerson, (req, res) => {
    res.status(200).send({ ok: true });
});

// check logged in
router.post("/loggedin", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// forgot password
router.post("/forgotpassword", forgotPasswordController);

// protected user route
// router.get("/cust", isCustomer, (req, res) => {
//     res.status(200).send({ ok: true });
// })

// test
// router.get("/test", requireSignIn, isMerchant, async (req, res) => { res.send("Protected") })

// getHashPasswordController
router.get("/getHashPassword/:password", getHashPasswordController);


// router.get("/update-hh-pwd", pswd);

export default router
