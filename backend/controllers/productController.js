import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";

// @desc   Get all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	if (products) {
		res.status(200).json(products);
	} else {
		res.status(404).json("Products not found");
	}
});

// @desc   Get product by ID
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404).json("Product not found");
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
		category,
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
		category,
	});

	await newProduct.save();

	res.json(newProduct);
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
		category,
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
		product.category = category || product.category;

		await product.save();

		res.json(product);
	} else {
		res.status(404).json("Product not found");
	}
});

// @desc   Delete Product (Admin Only)
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.delete();

		res.json("Product deleted");
	} else {
		res.status(400).json("Error with deleting product");
	}
});

export {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
