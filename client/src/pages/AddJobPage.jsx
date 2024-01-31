/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';

import { Form, useNavigation, useOutletContext } from 'react-router-dom';
import { FormRow, FormRowSelect } from '../components';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants.js';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/api/customFetch.js';

export const addJobAction =
	(queryClient) =>
	async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			await customFetch.post('/jobs', data);
			queryClient.invalidateQueries(['jobs']);
			toast.success('Job added successfully!');
			return redirect('all-jobs');
		} catch (error) {
			toast.error(error?.response?.data?.msg);
			return error;
		}
	};

const AddJobPage = () => {
	// getting user data thru Outlet in DashboardPage
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<Wrapper>
			<Form method="post" className="form">
				<h4 className="form-title">add job</h4>
				<div className="form-center">
					{/* INPUTS */}
					<FormRow type="text" name="position" />
					<FormRow type="text" name="company" />
					<FormRow
						type="text"
						labelText="job location"
						name="jobLocation"
						defaultValue={user.location}
					/>

					{/* SELECTION */}
					<FormRowSelect
						labelText="job status"
						name="jobStatus"
						defaultValue={JOB_STATUS.INTERVIEW}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						labelText="job type"
						name="jobType"
						defaultValue={JOB_TYPE.FULL_TIME}
						list={Object.values(JOB_TYPE)}
					/>
					<button
						type="submit"
						className="btn btn-block form-btn"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'submitting...' : 'submit'}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	border-radius: var(--border-radius);
	width: 100%;
	background: var(--background-secondary-color);
	padding: 3rem 2rem 4rem;
	.form-title {
		margin-bottom: 2rem;
	}
	.form {
		margin: 0;
		border-radius: 0;
		box-shadow: none;
		padding: 0;
		max-width: 100%;
		width: 100%;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		row-gap: 1rem;
	}
	.form-btn {
		align-self: end;
		margin-top: 1rem;
		display: grid;
		place-items: center;
	}

	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 1rem;
		}
	}
	@media (min-width: 1120px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
`;

export default AddJobPage;
