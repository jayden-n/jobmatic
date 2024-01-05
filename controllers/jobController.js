import Job from "../models/JobModel.js";
import { nanoid } from "nanoid";

let jobs = [
	{
		id: nanoid(),
		company: "apple",
		position: "front-end",
	},
	{
		id: nanoid(),
		company: "amazon",
		position: "back-end",
	},
	{
		id: nanoid(),
		company: "google",
		position: "full-stack",
	},
];
// ========= GEL ALL JOBS =========
export const getAllJobs = async (req, res) => {
	res.status(200).json({ jobs });
};
// ========= GET SINGLE JOB  =========
export const getSingleJob = async (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}

	res.status(200).json({ job });
};

// ========= CREATE JOB =========
export const createJob = async (req, res) => {
	const job = await Job.create(req.body);
	// 201: creating a resource
	res.status(201).json({ job });
};

//  ========= UPDATE JOB  =========
export const updateJob = async (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res.status(404).json({ msg: "please provide company and position" });
	}

	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);

	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}

	job.company = company;
	job.position = position;

	res.status(200).json({ msg: "job modified!", job });
};

//  ========= DELETE JOB  =========
export const deleteJob = async (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}

	const newJobs = jobs.filter((job) => job.id !== id);
	jobs = newJobs;

	res.status(200).json({ msg: "job deleted" });
};
