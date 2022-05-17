import asyncHandler from "express-async-handler";
import Order from "../model/orderModel.js";

// @desc   Create order
// @route  POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		totalPrice,
		shippingPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400).json("No order items");
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			totalPrice,
			shippingPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @desc   Get all orders
// @route  GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find().populate("user", "name email");

	if (!orders) {
		return res.status(404).json("Order not found");
	} else {
		res.json(orders);
	}
});

// @desc   Get loggedin user orders
// @route  GET /api/orders/my
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user.id });

	if (orders) {
		res.status(200).json(orders);
	} else {
		res.status(404).json("Orders not found");
	}
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (!order) {
		return res.status(404).json("Order not found");
	} else {
		res.json(order);
	}
});

// @desc   Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404).json("Order not found");
	}
});

// @desc   Update order to delivered(Admin Only)
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const udpateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404).json("Order not found");
	} else {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	}
});

export {
	createOrder,
	getOrders,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	udpateOrderToDelivered,
};
