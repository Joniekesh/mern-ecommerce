import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select("-password");

			next();
		} catch (error) {
			console.error(error);
			res.status(401).json({ msg: "No token. Authorization denied" });
		}
	}
	if (!token) {
		res.status(400).json({ msg: "Not authorized. No token." });
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res
			.status(401)
			.json({ msg: "You are not authorized to access this route" });
	}
};

export { protect, admin };
