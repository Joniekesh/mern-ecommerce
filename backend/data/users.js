import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin User",
		email: "admin@example.com",
		password: bcrypt.hashSync("123456", 10),
		gender: "MALE",
		isAdmin: true,
	},
	{
		name: "John Doe",
		email: "john@example.com",
		password: bcrypt.hashSync("123456", 10),
		gender: "MALE",
	},
	{
		name: "Jane Doe",
		email: "jane@example.com",
		password: bcrypt.hashSync("123456", 10),
		gender: "FEMALE",
	},
];

export default users;
