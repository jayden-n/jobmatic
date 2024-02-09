import bcrypt from 'bcryptjs';

export const passwordHashing = async (password: string) => {
	const salt: string = await bcrypt.genSalt(10);
	const hashedPassword: string = await bcrypt.hash(password, salt);

	return hashedPassword;
};

export const comparePassword = async (
	password: string,
	hashedPassword: string,
) => {
	const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
	return isMatch;
};
