import jwt from 'jsonwebtoken';

// define the structure of the payload
export interface IJwtPayload {
	userId: string;
	role: string;
}

export const createJWT = (payload: IJwtPayload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	return token;
};

export const verifyJWT = (token: string): IJwtPayload | null => {
	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string,
		) as IJwtPayload;
		return decoded;
	} catch (error) {
		// Handle verification errors (e.g., token expired, invalid signature)
		return null;
	}
};
