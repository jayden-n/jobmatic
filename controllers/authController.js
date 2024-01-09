import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, passwordHashing } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
	// setting the first account always to be an admin - for easier testing purpose
	const isFirstAccount = (await User.countDocuments()) === 0;
	req.body.role = isFirstAccount ? "admin" : "user";

	const hashedPassword = await passwordHashing(req.body.password);

	req.body.password = hashedPassword;

	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: "user created!" });
};

export const login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	const isValidUser =
		user && (await comparePassword(req.body.password, user.password));

	if (!isValidUser) {
		throw new UnauthenticatedError("invalid credentials");
	}

	const token = createJWT({ userId: user._id, role: user.role });

	res.json({ token });
};
