import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { comparePassword, passwordHashing } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

// ================== REGISTER ==================
export const register = async (req, res) => {
	// setting the first account always to be an admin - for easier testing purpose
	const isFirstAccount = (await User.countDocuments()) === 0;
	req.body.role = isFirstAccount ? 'admin' : 'user';

	const hashedPassword = await passwordHashing(req.body.password);

	req.body.password = hashedPassword;

	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: 'user created!' });
};

// ================== LOGIN ==================
export const login = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	const isValidUser =
		user && (await comparePassword(req.body.password, user.password));

	if (!isValidUser) {
		throw new UnauthenticatedError('invalid credentials');
	}

	const token = createJWT({ userId: user._id, role: user.role });

	// 1 day in milliseconds
	const oneDay = 1000 * 60 * 60 * 24;

	// cookie cannot be accessed with JavaScript
	// => more secure
	res.cookie('token', token, {
		httpOnly: true,
		// cookie will expire in 1 day
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === 'production',
	});

	res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

// ================== LOGOUT ==================

export const logout = (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
