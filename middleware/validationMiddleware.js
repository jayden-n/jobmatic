import { body, param, validationResult } from 'express-validator';
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

// ================== USE MODELS AS GUIDELINES ==================

const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((error) => error.msg);

				// throw a 404 error
				if (errorMessages[0].startsWith('no job')) {
					throw new NotFoundError(errorMessages);
				}

				if (errorMessages[0].startsWith('not authorized')) {
					throw new UnauthorizedError('not authorized to access this route');
				}

				// if not, throw a 400 error
				throw new BadRequestError(errorMessages);
			}
			next();
		},
	];
};

// export const validateTest = withValidationErrors([
// 	body("name").notEmpty().withMessage("name is required"),
// ]);

// ================== JOB VALIDATION ==================

export const validateJobInput = withValidationErrors([
	body('company').notEmpty().withMessage('company is required'),
	body('position').notEmpty().withMessage(' position is required'),
	body('jobLocation').notEmpty().withMessage(' jobLocation is required'),
	body('jobStatus')
		.isIn(Object.values(JOB_STATUS))
		.withMessage(' invalid status value'),
	body('jobType')
		.isIn(Object.values(JOB_TYPE))
		.withMessage(' invalid type value'),
]);

// ================== ID PARAM VALIDATION ==================
export const validateIdParam = withValidationErrors([
	param('id')
		.custom(async (value, { req }) => {
			const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
			if (!isValidMongoId) {
				throw new BadRequestError('Invalid MongoDB id');
			}
			const job = await Job.findById(value);

			if (!job) {
				throw new NotFoundError(`No job with id ${value}`);
			}

			const isAdmin = req.user.role === 'admin';
			const isOwner = req.user.userId === job.createdBy.toString();

			if (!isAdmin && !isOwner) {
				throw new UnauthorizedError('Not authorized to access this route');
			}
		})
		.withMessage('Invalid MongoDB id'),
]);

// ================== REGISTER VALIDATION ==================
export const validateRegisterInput = withValidationErrors([
	body('name').notEmpty().withMessage('name is required'),
	body('email')
		.notEmpty()
		.withMessage(' email is required')
		.isEmail()
		.withMessage(' invalid email format')
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) {
				throw new BadRequestError(' email already exists');
			}
		}),

	body('password')
		.notEmpty()
		.withMessage(' password is required')
		.isLength({ min: 8 })
		.withMessage(' password must be at least 8 characters long'),
	body('location').notEmpty().withMessage(' location is required'),
	body('lastName').notEmpty().withMessage(' last name is required'),
]);

// ================== LOGIN VALIDATION ==================
export const validateLoginInput = withValidationErrors([
	body('email')
		.notEmpty()
		.withMessage(' email is required')
		.isEmail()
		.withMessage(' invalid email format'),
	body('password').notEmpty().withMessage('password is required'),
]);

// ================== UPDATE USER VALIDATION ==================
export const validateUpdateUserInput = withValidationErrors([
	body('name').notEmpty().withMessage('name is required'),
	body('email')
		.notEmpty()
		.withMessage(' email is required')
		.isEmail()
		.withMessage(' invalid email format')
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });

			// making sure to check for other users not using the same about-to updated email
			if (user && user._id.toString() !== req.user.userId) {
				throw new BadRequestError(' email already exists');
			}
		}),

	body('location').notEmpty().withMessage('location is required'),
	body('lastName').notEmpty().withMessage('last name is required'),
]);
