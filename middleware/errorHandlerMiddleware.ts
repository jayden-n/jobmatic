import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error } from 'mongoose';

class CustomError extends Error {
	statusCode?: number;

	constructor(message: string, statusCode?: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

const errorHandlerMiddleware = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log(err);
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const msg = err.message || 'Something went wrong!';
	res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
