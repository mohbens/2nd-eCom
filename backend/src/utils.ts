import { User } from "./models/userModel";
import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_SECRET || "Secretkey123",
		{
			expiresIn: "30d",
		}
	);
};
