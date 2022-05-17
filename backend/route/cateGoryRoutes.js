import express from "express";
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategoryById,
	updateCategory,
} from "../controllers/categoryController.js";
const router = express();
import { protect, admin } from "../middleware/auth.js";

router.route("/").post(protect, admin, createCategory).get(getCategories);
router
	.route("/:id")
	.get(getCategoryById)
	.put(protect, admin, updateCategory)
	.delete(protect, admin, deleteCategory);

export default router;
