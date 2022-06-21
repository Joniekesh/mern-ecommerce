import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/auth.js";
import {
	registerUser,
	loginUser,
	getUserProfile,
	updateProfile,
	getUserById,
	adminCreateUser,
	getUsers,
	UpdateUser,
	deleteUserById,
	getUserStats,
} from "../controllers/userController.js";

router.post("/admin/create", protect, admin, adminCreateUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", loginUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateProfile);

router.route("/stats").get(protect, admin, getUserStats);
router
	.route("/:id")
	.get(protect, admin, getUserById)
	.put(protect, admin, UpdateUser)
	.delete(protect, admin, deleteUserById);

export default router;
