import express from "express";
const router = express.Router();
import {
	addReview,
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/auth.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
	.route("/:id")
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, addReview);

export default router;
