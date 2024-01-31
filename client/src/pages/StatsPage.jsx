/* eslint-disable react-refresh/only-export-components */
import customFetch from '../utils/api/customFetch';
import { ChartsContainer, StatsContainer } from '../components';
import { useQuery } from '@tanstack/react-query';

const statsQuery = {
	queryKey: ['stats'],
	queryFn: async () => {
		const response = await customFetch.get('/jobs/stats');
		return response.data;
	},
};

export const loader = (queryClient) => async () => {
	//  ensureQueryData: get an existing query's cached data
	const data = await queryClient.ensureQueryData(statsQuery);
	return null;
};

const StatsPage = () => {
	// prefer useQuery than useLoaderData because of autofocus
	// 1st try response will be undefined...
	// 2nd try will be the data...
	const { data } = useQuery(statsQuery);
	const { defaultStats, monthlyApplications } = data;

	return (
		<>
			{/* stats container */}
			<StatsContainer defaultStats={defaultStats} />

			{/* monthly applications */}
			{monthlyApplications?.length > 1 && (
				<ChartsContainer data={monthlyApplications} />
			)}
		</>
	);
};
export default StatsPage;
