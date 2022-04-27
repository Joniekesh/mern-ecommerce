import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/auth.js";
import {
	registerUser,
	loginUser,
	getUserProfile,
	updateProfile,
} from "../controllers/userController.js";

router.route("/").post(registerUser);
router.post("/login", loginUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateProfile);

export default router;
