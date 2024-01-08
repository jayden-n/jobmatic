import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

export const register = async (req, res) => {
	// setting the first account always to be an admin - for easier testing purpose
	const isFirstAccount = (await User.countDocuments()) === 0;
	req.body.role = isFirstAccount ? "admin" : "user";

	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
	res.send("login");
};
