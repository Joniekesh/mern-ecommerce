import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

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

	if (user && (await user.matchPassword(password))) {
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
	const { name, email, avatar, phoneNumber, password } = req.body;

	const user = await User.findById(req.user._id);

	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		user.avatar = avatar || user.avatar;
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

export { registerUser, loginUser, getUserProfile, updateProfile };
