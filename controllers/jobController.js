import 'express-async-errors';
import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

// ================== GET ALL JOBS ==================
export const getAllJobs = async (req, res) => {
	const { search, jobStatus, jobType, sort } = req.query;

	const queryObject = {
		createdBy: req.user.userId,
	};

	// check if user input anything in query string
	if (search) {
		queryObject.$or = [
			// will search for both position & company, dont care about word-casing
			{
				position: { $regex: search, $options: 'i' },
				company: { $regex: search, $options: 'i' },
			},
		];
	}
	if (jobStatus && jobStatus !== 'all') {
		queryObject.jobStatus = jobStatus;
	}
	if (jobType && jobType !== 'all') {
		queryObject.jobType = jobType;
	}

	const sortOptions = {
		'newest': '-createdAt',
		'oldest': 'createdAt',
		'a-z': 'position',
		'z-a': '-position',
	};

	// based on dynamic values
	const sortKey = sortOptions[sort] || sortOptions.newest;

	// setup pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	// 1st page: (1 - 1) * 8 = 0
	// 2nd page: (2 - 1) * 8 = 8 => skip the first 8 pages to display new 8 pages on the 2nd page
	const skip = (page - 1) * limit;

	const jobs = await Job.find(queryObject)
		.sort(sortKey)
		.skip(skip)
		.limit(limit);
	const totalJobs = await Job.countDocuments(queryObject);

	// control how many pages you have on front-end:
	// 99 / 10, last page just have 9 jobs only
	const numOfPages = Math.ceil(totalJobs / limit);
	res
		.status(StatusCodes.OK)
		.json({ totalJobs, numOfPages, currentPage: page, jobs });
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

//  ================== SHOW STATS ==================
export const showStats = async (req, res) => {
	// ========= Jobs stats =========
	let stats = await Job.aggregate([
		// Filters the jobs so that only the ones created by the user specified by req.user.userId are passed to the next stage.
		// The "new mongoose.Types.ObjectId(req.user.userId)" part converts req.user.userId into an ObjectId (which is the format MongoDB uses for ids).
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },

		// Groups the remaining jobs by their status (the jobStatus field).
		// For each group, it calculates the count of jobs by adding 1 for each job ({ $sum: 1 }), and stores this in a field called count.
		{ $group: { _id: '$jobStatus', count: { $sum: 1 } } },
	]);

	// reduce will return an obj
	// "acc" will be what you return
	stats = stats.reduce((acc, cur) => {
		// current values
		const { _id: title, count } = cur;

		// will have dynamic props from _id: '$jobStatus'
		// return: { declined: 35, interview: 29, pending: 36 }
		acc[title] = count;
		return acc;
	}, {});

	const defaultStats = {
		// if new user just signed up, they will get 0 jobs
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};

	// ========= Applications per month =========
	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				// display the month / year thru $createdAt
				_id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
			// ==> {
			//    "_id": {
			//      "year": 2023,
			//      "month": 12
			//    },
			//    "count": 12
			//  },
		},
		{
			// sort out the latest month first
			$sort: {
				// starts with the biggest value
				'_id.year': -1,
				'_id.month': -1,
			},
		},
		{ $limit: 6 },
	]);

	monthlyApplications = monthlyApplications
		.map((item) => {
			const monthNames = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			];

			const date = `${monthNames[item._id.month - 1]} ${item._id.year}`;

			return {
				date,
				count: item.count,
			};
		})
		.reverse();
	// console.log(monthlyApplications);

	// ========= dummy data =========
	// let monthlyApplications = [
	// 	{
	// 		date: 'May 23',
	// 		count: 12,
	// 	},
	// 	{
	// 		date: 'June 23',
	// 		count: 9,
	// 	},
	// 	{
	// 		date: 'July 23',
	// 		count: 3,
	// 	},
	// ];

	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
