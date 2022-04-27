import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/auth.js";
import {
	registerUser,
	loginUser,
	getUserProfile,
	updateProfile,
	deleteUser,
	getUserById,
	getUsers,
	UpdateUser,
	deleteUserById,
} from "../controllers/userController.js";

router
	.route("/")
	.post(registerUser)
	.delete(protect, deleteUser)
	.get(protect, admin, getUsers);
router.post("/login", loginUser);
router
	.route("/profile")
	.get(protect, getUserProfile)
	.put(protect, updateProfile);
router
	.route("/:id")
	.get(protect, admin, getUserById)
	.put(protect, admin, UpdateUser)
	.delete(protect, admin, deleteUserById);

export default router;
