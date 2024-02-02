import mongoose from 'mongoose';
import { USER_ROLE } from '../utils/constants.js';

// for better types in frontend
export type UserType = {
	_id: string;
	name: string;
	email: string;
	password: string;
	lastName: string;
	location: string;
	role: string;
	avatar: string;
	avatarPublicId: string;
};

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: {
		type: String,
		default: 'lastName',
	},

	location: {
		type: String,
		default: 'earth',
	},
	role: {
		type: String,
		enum: Object.values(USER_ROLE),
		default: USER_ROLE.USER,
	},
	avatar: String,
	avatarPublicId: String,
});

// get back the user without the password:
UserSchema.methods.toJSON = function () {
	let obj = this.toObject();
	delete obj.password;
	return obj;
};

export default mongoose.model<UserType>('User', UserSchema);
