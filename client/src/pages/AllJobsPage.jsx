import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import { createContext } from "react";

export const AllJobsContext = createContext();
const AllJobsPage = () => {
	const data = useLoaderData();

	return (
		<AllJobsContext.Provider value={{ data }}>
			<SearchContainer />
			<JobsContainer />
		</AllJobsContext.Provider>
	);
};

export default AllJobsPage;
