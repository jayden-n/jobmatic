/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { JobsContainer, SearchContainer } from '../components';
import { createContext } from 'react';
import customFetch from '../utils/api/customFetch';
import { QueryClient, useQuery } from '@tanstack/react-query';

// query has to be a function
// because params will be passed in here (dynamic)
const allJobsQuery = (params: any) => {
	const { search, jobStatus, jobType, sort, page } = params;

	return {
		queryKey: [
			'jobs',
			// if the left side is null or undefined it will return the right side
			search ?? '',
			jobStatus ?? 'all',
			jobType ?? 'all',
			sort ?? 'newest',
			page ?? 1,
		],

		queryFn: async () => {
			const { data } = await customFetch.get('/jobs', {
				// pass in the params thru axios
				params,
			});
			return data;
		},
	};
};

export const allJobsLoader =
	(queryClient: QueryClient) =>
	async ({ request }: any) => {
		const params = Object.fromEntries([
			// turn the url query values into object
			...new URL(request.url).searchParams.entries(),
		]);

		await queryClient.ensureQueryData(allJobsQuery(params));
		return { searchValues: { ...params } };
	};

export const AllJobsContext = createContext<any>({});

const AllJobsPage: React.FC = () => {
	const { searchValues }: any = useLoaderData();
	const { data } = useQuery(allJobsQuery(searchValues));

	return (
		<AllJobsContext.Provider value={{ data, searchValues }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	);
};

export default AllJobsPage;
