import mongoose from "mongoose";
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`MongoDB connection success ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};
export default connectDB;
