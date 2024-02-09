/* eslint-disable react-refresh/only-export-components */
import {
	ActionFunctionArgs,
	Form,
	LoaderFunctionArgs,
	redirect,
	useLoaderData,
	useNavigation,
} from 'react-router-dom';
import customFetch from '../utils/api/customFetch';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { QueryClient } from '@tanstack/react-query';
import { JobType } from '../../../models/JobModel';

export const loader = async ({ params }: LoaderFunctionArgs) => {
	try {
		const { data } = await customFetch.get(`/jobs/${params.id}`);
		return data;
	} catch (error: any) {
		toast.error(error?.response?.data?.msg);
		return redirect('../all-jobs');
	}
};

export const action =
	(queryClient: QueryClient) =>
	async ({ request, params }: ActionFunctionArgs) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			await customFetch.patch(`/jobs/${params.id}`, data);
			queryClient.invalidateQueries(['jobs']);
			toast.success('Updated job successfully!');
			return redirect('../all-jobs');
		} catch (error: any) {
			toast.error(error?.response?.data?.msg);
			return error;
		}
	};

const EditJobPage: React.FC = () => {
	// getting job data from loader
	const { job } = useLoaderData() as { job: JobType };

	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<Wrapper>
			<Form method="post" className="form">
				<h4 className="form-title">
					update job at <span className="company"> {job.company} </span>company
				</h4>

				<div>
					<FormRow type="text" name="position" defaultValue={job.position} />
					<FormRow type="text" name="company" defaultValue={job.company} />
					<FormRow
						type="text"
						name="jobLocation"
						labelText="job location"
						defaultValue={job.jobLocation}
					/>
					<FormRowSelect
						name="jobStatus"
						labelText="job status"
						defaultValue={job.jobStatus}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						name="jobType"
						labelText="job type"
						defaultValue={job.jobType}
						list={Object.values(JOB_TYPE)}
					/>
					<button
						type="submit"
						className="btn btn-block form-btn"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'updating...' : 'update'}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	.form-title {
		margin-bottom: 2rem;
		.company {
			color: var(--primary-500);
		}
	}
`;
export default EditJobPage;
