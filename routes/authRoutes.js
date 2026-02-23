import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import validInfo from "../middleware/validInfo.js";

const router = express.Router();

router.post("/register", validInfo, registerUser);
router.post("/login", validInfo, loginUser);

export default router;
