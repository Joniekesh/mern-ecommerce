import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";

// @desc   Get all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const qCategory = req.query.cat;
	const qNew = req.query.new;

	let products;

	if (qCategory) {
		products = await Product.find({
			categories: {
				$all: [qCategory],
			},
		});
	} else if (qNew) {
		products = await Product.find().sort({ createdAt: -1 }).limit(1);
	} else {
		products = await Product.find();
	}
	res.status(200).json(products);
});

// @desc   Get product by ID
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		return res.status(200).json(product);
	} else {
		return res.status(404).json("Product not found");
	}
});

// @desc   Create product (Admin Only)
// @route  POST /api/products
// access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const {
		name,
		image,
		description,
		price,
		countInStock,
		color,
		size,
		brand,
		categories,
	} = req.body;

	const newProduct = new Product({
		user: req.user.id,
		name,
		image,
		description,
		price,
		countInStock,
		color,
		size,
		brand,
		categories,
	});

	await newProduct.save();

	return res.json(newProduct);
});

// @desc   Update product (Admin Only)
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		image,
		description,
		price,
		countInStock,
		color,
		size,
		brand,
		categories,
	} = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name || product.name;
		product.image = image || product.image;
		product.description = description || product.description;
		product.price = price || product.price;
		product.countInStock = countInStock || product.countInStock;
		product.color = color || product.color;
		product.size = size || product.size;
		product.brand = brand || product.brand;
		product.categories = categories || product.categories;

		await product.save();

		res.json(product);
	} else {
		return res.status(404).json("Product not found");
	}
});

// @desc   Delete Product (Admin Only)
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.delete();

		return res.json("Product deleted");
	} else {
		return res.status(400).json("Error with deleting product");
	}
});

// @desc   Add Product Review
// @route  POST /api/products/:id/reviews
// @access Private
const addReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const user = await User.findById(req.user.id);

	const product = await Product.findById(req.params.id);

	if (!product) {
		return res.status(404).json("Product not found");
	}

	const alreadyReviewed = product.reviews.find(
		(review) => review.user.toString() === req.user.id.toString()
	);

	if (alreadyReviewed) {
		return res.status(400).json("Product already reviewed");
	}

	const newReview = {
		user: req.user.id,
		name: user.name,
		rating: Number(rating),
		comment,
	};

	product.reviews.unshift(newReview);

	product.numReviews = product.reviews.length;

	product.rating =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save();

	return res.json("Review Added");
});

export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	addReview,
};
