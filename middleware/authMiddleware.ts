import {
	UnauthenticatedError,
	UnauthorizedError,
	BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		throw new UnauthenticatedError("authentication invalid");
	}

	try {
		const { userId, role } = verifyJWT(token);
		const testUser = userId === "65a99d0b903d422de8816ae7";

		req.user = { userId, role, testUser };
		next();
	} catch (error) {
		throw new UnauthenticatedError("authentication invalid");
	}
};

export const authorizedPermissions = (...roles) => {
	// console.log(roles);
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new UnauthorizedError("unauthorized to access this route");
		}
		next();
	};
};

export const checkForTestUser = (req, res, next) => {
	if (req.user.testUser) {
		throw new BadRequestError("Reminder: Demo User. Read-only!");
	}

	next();
};
