import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			default: "",
		},
		password: {
			type: String,
			default: "",
		},
		avatar: {
			type: String,
			default:
				"https://media.istockphoto.com/vectors/avatar-business-avatars-profile-icons-set-vector-vector-id967261826",
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		phoneNumber: {
			type: String,
			default: "",
		},
		gender: {
			type: String,
			enum: ["MALE", "FEMALE"],
			default: "MALE",
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
