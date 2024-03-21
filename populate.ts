import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/UserModel.js";
import Job from "./models/JobModel.js";
import { fileURLToPath } from "url";

// define types/interface for mock json job data structures
interface IJobData {
	company: string;
	position: string;
	jobLocation: string;
	jobStatus: string;
	jobType: string;
	createdAt: string;
}

try {
	await mongoose.connect(process.env.MONGO_URL as string);
	const user = await User.findOne({ email: "test@test.com" });

	const filePath: string = fileURLToPath(
		new URL("./utils/mockData.json", import.meta.url),
	);
	const jsonJobs: IJobData[] = JSON.parse(await readFile(filePath, "utf-8"));

	const jobs = jsonJobs.map((job) => {
		return { ...job, createdBy: user!._id }; // there will always be a test user in database => !null
	});

	await Job.deleteMany({ createdBy: user!._id }); // there will always be a test user in database => !null
	await Job.create(jobs);

	process.exit(0);
} catch (error) {
	console.log(error);
	process.exit(1);
}
