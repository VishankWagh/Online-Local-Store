import express from "express";
import { cregisterController, dregisterController, sregisterController } from "../controller/authController.js";

const router = express.Router();

// customer register
router.post("/c-register", cregisterController);

// shop register
router.post("/s-register", sregisterController);

// delivery person register
router.post("/d-register", dregisterController);

// User Login
// router.get("/login/:user", loginController);

export default router
