import { NextFunction, Request, Response } from "express";
import {
	UnauthenticatedError,
	UnauthorizedError,
	BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT, IJwtPayload } from "../utils/tokenUtils.js";

// extend Request type to include user property
declare global {
	namespace Express {
		interface Request {
			user?: {
				userId: string;
				role: string;
				testUser: boolean;
			};
		}
	}
}

export const authenticateUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { token } = req.cookies;

	if (!token) {
		throw new UnauthenticatedError("Authentication invalid");
	}

	try {
		const decodedToken = verifyJWT(token);

		if (!decodedToken) {
			throw new UnauthenticatedError("Authentication invalid");
		}

		const { userId, role } = decodedToken as IJwtPayload;
		const testUser = userId === "65fc67d78f58d91347cb26ab";

		req.user = { userId, role, testUser };
		next();
	} catch (error) {
		throw new UnauthenticatedError("Authentication invalid");
	}
};

export const authorizedPermissions = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user || !roles.includes(req.user.role)) {
			throw new UnauthorizedError("Unauthorized to access this route");
		}
		next();
	};
};

export const checkForTestUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.user && req.user.testUser) {
		throw new BadRequestError("Reminder: Demo User. Read-only!");
	}

	next();
};
