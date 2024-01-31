/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/api/customFetch';
import { ChartsContainer, Loading, StatsContainer } from '../components';
import { useQuery } from '@tanstack/react-query';

export const loader = async () => {
	return null;
};

const StatsPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['stats'],
		queryFn: async () => await customFetch.get('/jobs/stats'),
	});
	// 1st try res will be undefined...

	if (isLoading) {
		return <Loading />;
	}
	if (isError) {
		return <h4>Error...</h4>;
	}

	// 2nd try will be the data...
	// console.log(data.data);
	const { defaultStats, monthlyApplications } = data.data;

	// const { defaultStats, monthlyApplications } = useLoaderData();
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
