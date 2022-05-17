import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		description: {
			type: String,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		brand: {
			type: String,
			required: true,
		},
		categories: {
			type: Array,
			required: true,
		},
		color: {
			type: Array,
		},
		size: {
			type: Array,
		},

		reviews: [reviewSchema],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
