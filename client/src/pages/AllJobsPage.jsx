import { useLoaderData } from 'react-router-dom';
import { JobsContainer, SearchContainer } from '../components';
import { createContext } from 'react';

export const AllJobsContext = createContext();
const AllJobsPage = () => {
	const { data, searchValues } = useLoaderData();

	return (
		<AllJobsContext.Provider value={{ data, searchValues }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	);
};

export default AllJobsPage;
