/* eslint-disable react-refresh/only-export-components */
import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import customFetch from '../utils/api/customFetch';
import { redirect, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { StatItem } from '../components';
import { UserType } from '../../../models/UserModel';
import { JobType } from '../../../models/JobModel';

interface LoaderData {
	users: number;
	jobs: number;
}

export const loader = async () => {
	try {
		const res = await customFetch.get('/users/admin/application-stats');
		return res.data;
	} catch (error: any) {
		toast.error('You are not authorized to access this route!');
		console.log(error?.response?.data?.msg);
		return redirect('/dashboard');
	}
};

const AdminPage: React.FC = () => {
	const { users, jobs } = useLoaderData() as LoaderData;

	return (
		<Wrapper>
			<StatItem
				title="current users"
				count={users}
				color="#e9b949"
				bcg="#fcefc7"
				icon={<FaSuitcaseRolling />}
			/>
			<StatItem
				title="total jobs"
				count={jobs}
				color="#647acb"
				bcg="#e0e8f9"
				icon={<FaCalendarCheck />}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	display: grid;
	row-gap: 2rem;
	@media (min-width: 769px) {
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
	}
	@media (min-width: 1120px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;
export default AdminPage;
