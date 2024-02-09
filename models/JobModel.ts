import mongoose, { Types } from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';

// for better types in frontend
export type JobType = {
	_id: string;
	company: string;
	position: string;
	jobStatus: string;
	jobType: string;
	jobLocation: string;
	createdBy: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
};

const JobSchema = new mongoose.Schema(
	{
		company: String,
		position: String,

		jobStatus: {
			type: String,
			enum: Object.values(JOB_STATUS),
			default: JOB_STATUS.PENDING,
		},
		jobType: {
			type: String,
			enum: Object.values(JOB_TYPE),
			default: JOB_TYPE.FULL_TIME,
		},
		jobLocation: {
			type: String,
			default: 'earth',
		},

		// will be tied to users
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true },
);

export default mongoose.model<JobType>('Job', JobSchema);
