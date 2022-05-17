import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

// USER ROUTES PERMISSION
// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).json("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	res.status(201).json({
		user,
		token: generateToken(user._id),
	});
});

// @desc   Login a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (email && password && user && (await user.matchPassword(password))) {
		res.json({
			user,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json("Invalid email or password");
	}
});

// @desc   Get logged in user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");

	if (user) {
		res.json(user);
	} else {
		res.status(404).json("User not found");
	}
});

// @desc   Update profile,
// @route  PUT /api/users/profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
	const { name, email, avatar, gender, phoneNumber, password } = req.body;

	const user = await User.findById(req.user._id);

	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		user.avatar = avatar || user.avatar;
		user.gender = gender || user.gender;
		user.phoneNumber = phoneNumber || user.phoneNumber;

		if (password) {
			user.password = password;
		}
		await user.save();

		res.json({
			user,
			token: generateToken(user._id),
		});
	} else {
		res.status(404).json("User not found");
	}
});

// @desc   Delete User
// @route  DELETE /api/users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		await user.remove();

		res.json("User removed");
	} else {
		res.status(404).json("User not found");
	}
});

// ADMIN ROUTES PERMISSION
// @desc   Get all users (Admin Only)
// @route  GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});

	if (users) {
		res.status(200).json(users);
	} else {
		res.status(404).json("User not found");
	}
});

// @desc   Get user by ID (Admin Only)
// @route  GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id).select("-password");

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json("User not found");
	}
});

// @desc   Update a user (Admin Only)
// @route  PUT /api/users/:id
// @access Private/Admin
const UpdateUser = asyncHandler(async (req, res) => {
	let user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
		user.avatar = req.body.avatar || user.avatar;
		user.gender = req.body.gender || user.gender;
		user.isAdmin = req.body.isAdmin;
		if (req.body.password) {
			user.password = req.body.password;
		}

		await user.save();
		res.json(user);
	} else {
		res.status(404).json("User not found");
	}
});

// @desc   Delete a user (Admin Only)
// @route  DELETE /api/users/:id
// @access Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();

		res.json("User removed");
	} else {
		res.status(400).json("User not removed");
	}
});

export {
	registerUser,
	loginUser,
	getUserProfile,
	updateProfile,
	deleteUser,
	getUsers,
	getUserById,
	UpdateUser,
	deleteUserById,
};
