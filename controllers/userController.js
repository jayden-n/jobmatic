import { StatusCodes } from 'http-status-codes';

import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

export const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	const userWithoutPassword = user.toJSON();
	res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
	const users = await User.countDocuments();
	const jobs = await Job.countDocuments();

	res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
	const newUser = { ...req.body };
	// remove password before passing to response
	delete newUser.password;

	if (req.file) {
		const response = await cloudinary.v2.uploader.upload(req.file.path);

		// unlink the local path after uploading to Cloudinary
		await fs.unlink(req.file.path);
		newUser.avatar = response.secure_url;
		newUser.avatarPublicId = response.public_id;
	}

	const oldUpdatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

	// if the user updated a new avatar, the old one will be destroyed
	if (req.file && oldUpdatedUser.avatarPublicId) {
		await cloudinary.v2.uploader.destroy(oldUpdatedUser.avatarPublicId);
	}

	res.status(StatusCodes.OK).json({ msg: 'update user ' });
};
