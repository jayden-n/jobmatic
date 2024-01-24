/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/api/customFetch';
import { ChartsContainer, StatsContainer } from '../components';


export const loader = async () => {
	try {
		const res = await customFetch.get('/jobs/stats');
		return res.data;
	} catch (error) {
		return error;
	}
};

const StatsPage = () => {
	const { defaultStats, monthlyApplications } = useLoaderData();

	return (
		<>
			<StatsContainer defaultStats={defaultStats} />
			{/* check if user has any applications to display or not */}
			{monthlyApplications?.length > 1 && (
				<ChartsContainer data={monthlyApplications} />
			)}
		</>
	);
};
export default StatsPage;
