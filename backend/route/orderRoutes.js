import express from "express";
import {
	createOrder,
	getOrders,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	udpateOrderToDelivered,
} from "../controllers/orderController.js";
const router = express.Router();
import { protect, admin } from "../middleware/auth.js";

router.route("/").post(protect, createOrder);
router.route("/").get(protect, admin, getOrders);
router.route("/my").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, udpateOrderToDelivered);

export default router;
