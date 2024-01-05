import "express-async-errors";
import Job from "../models/JobModel.js";
import { nanoid } from "nanoid";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

// ================== GEL ALL JOBS ==================
export const getAllJobs = async (req, res) => {
	const jobs = await Job.find({});
	res.status(StatusCodes.OK).json({ jobs });
};

// ================== GET SINGLE JOB  ==================
export const getSingleJob = async (req, res) => {
	const { id } = req.params;
	const job = await Job.findById(id);

	if (!job) {
		throw new NotFoundError(`no job with id ${id}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

// ================== CREATE JOB ==================
export const createJob = async (req, res) => {
	const job = await Job.create(req.body);
	// 201: creating a resource
	res.status(StatusCodes.CREATED).json({ job });
};

//  ================== UPDATE JOB  ==================
export const updateJob = async (req, res) => {
	const { id } = req.params;

	const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updatedJob) {
		throw new NotFoundError(`no job with id ${id}`);
	}

	res.status(StatusCodes.OK).json({ msg: "job modified!", job: updatedJob });
};

//  ================== DELETE JOB  ==================
export const deleteJob = async (req, res) => {
	const { id } = req.params;

	const removedJob = await Job.findByIdAndDelete(id);

	if (!removedJob) {
		throw new NotFoundError(`no job with id ${id}`);
	}

	res.status(StatusCodes.OK).json({ msg: "job deleted", job: removeJob });
};
