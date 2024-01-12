import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";

const AllJobsPage = () => {
	const data = useLoaderData();
	console.log(data?.jobs);

	return (
		<>
			<SearchContainer />
			<JobsContainer />
		</>
	);
};
export default AllJobsPage;
