import mongoose from "mongoose";

const CategoryShema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},

		name: {
			type: String,
			required: true,
			unique: true,
		},
		photo: {
			type: String,
			default: "",
		},
	},
	{
		timetamps: true,
	}
);

const Category = mongoose.model("category", CategoryShema);
export default Category;
