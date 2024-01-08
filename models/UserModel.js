import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	lastName: {
		type: String,
		default: "lastName",
	},

	location: {
		type: String,
		default: "earth",
	},
	role: {
		type: String,
		enum: Object.values(USER_ROLE),
		default: USER_ROLE.USER,
	},
});

export default mongoose.model("User", UserSchema);
