import express from "express";
import { cregisterController, dregisterController, loginController, sregisterController } from "../controllers/authController.js";

const router = express.Router();

// customer register
router.post("/c-register", cregisterController);

// shop register
router.post("/s-register", sregisterController);

// delivery person register
router.post("/d-register", dregisterController);

// User Login
router.post("/login/:user", loginController);

export default router
