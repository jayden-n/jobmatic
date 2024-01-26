import { useAllJobsContext } from '../hooks/useAllJobsContext';

const PageBtnContainer = () => {
	const {
		data: { numOfPages, currentPage },
	} = useAllJobsContext();

	console.log(numOfPages, currentPage);

	return <h1>PageBtnContainer</h1>;
};
export default PageBtnContainer;
