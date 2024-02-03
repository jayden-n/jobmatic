import { StatusCodes } from 'http-status-codes';

import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';
import { Request, Response } from 'express';

export const getCurrentUser = async (req: Request, res: Response) => {
	// fixed: req.user is possibly null/undefined
	// by checking if exist or not before accessing them
	if (req.user && req.user.userId) {
		const user = await User.findOne({ _id: req.user.userId });
		if (user) {
			const userWithoutPassword = user.toJSON();
			res.status(StatusCodes.OK).json({ user: userWithoutPassword });
		} else {
			res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });
		}
	} else {
		res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
	}
};

export const getApplicationStats = async (req: Request, res: Response) => {
	const users = await User.countDocuments();
	const jobs = await Job.countDocuments();

	res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req: Request, res: Response) => {
	if (req.user && req.user.userId) {
		const newUser = { ...req.body };
		// remove password before passing to response
		delete newUser.password;

		if (req.file) {
			const file = formatImage(req.file);
			const response = await cloudinary.v2.uploader.upload(file as string);

			// unlink the local path after uploading to Cloudinary

			newUser.avatar = response.secure_url;
			newUser.avatarPublicId = response.public_id;
		}

		const oldUpdatedUser = await User.findByIdAndUpdate(
			req.user.userId,
			newUser,
		);

		// if the user updated a new avatar, the old one will be destroyed
		if (req.file && oldUpdatedUser && oldUpdatedUser.avatarPublicId) {
			await cloudinary.v2.uploader.destroy(oldUpdatedUser.avatarPublicId);
		}

		res.status(StatusCodes.OK).json({ msg: 'update user ' });
	} else {
		res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized' });
	}
};
