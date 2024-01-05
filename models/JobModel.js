import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
	{
		company: String,
		position: String,

		jobStatus: {
			type: String,
			enum: ["interview", "declined", "pending"],
			default: "pending",
		},
		jobType: {
			type: String,
			enum: ["full-time", "part-time", "internship"],
			default: "full-time",
		},
		jobLocation: {
			type: String,
			default: "my City",
		},
	},
	{ timestamps: true },
);

export default mongoose.model("Job", JobSchema);
