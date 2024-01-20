import 'express-async-errors';
import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

// ================== GET ALL JOBS ==================
export const getAllJobs = async (req, res) => {
	// only provide jobs to the specific user
	const jobs = await Job.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ jobs });
};

// ================== GET SINGLE JOB  ==================
export const getSingleJob = async (req, res) => {
	const job = await Job.findById(req.params.id);

	res.status(StatusCodes.OK).json({ job });
};

// ================== CREATE JOB ==================
export const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;

	const job = await Job.create(req.body);
	// 201: creating a resource
	res.status(StatusCodes.CREATED).json({ job });
};

//  ================== UPDATE JOB  ==================
export const updateJob = async (req, res) => {
	const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(StatusCodes.OK).json({ msg: 'job modified!', job: updatedJob });
};

//  ================== DELETE JOB  ==================
export const deleteJob = async (req, res) => {
	const removedJob = await Job.findByIdAndDelete(req.params.id);

	res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};

export const showStats = async (req, res) => {
	const defaultStats = {
		pending: 22,
		interview: 11,
		declined: 4,
	};

	let monthlyApplications = [
		{
			date: 'May 23',
			count: 12,
		},
		{
			date: 'June 23',
			count: 9,
		},
		{
			date: 'July 23',
			count: 3,
		},
	];

	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
