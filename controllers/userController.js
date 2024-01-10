import { StatusCodes } from "http-status-codes";

import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	const userWithoutPassword = user.toJSON();
	res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: "application stats " });
};

export const updateUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ msg: "update user " });
};
