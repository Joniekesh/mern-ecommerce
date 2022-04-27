import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import Product from "./model/productModel.js";
import User from "./model/userModel.js";
import Order from "./model/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Product.deleteMany();
		await User.deleteMany();
		await Order.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log("Data Import Success!");
		process.exit();
	} catch (error) {
		console.error("Data import fail", error);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		console.log("Data destroy successful");
		process.exit();
	} catch (error) {
		console.error("Unable to destroy data", error);

		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
