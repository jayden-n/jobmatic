import styled from 'styled-components';
import { useAllJobsContext } from '../hooks/useAllJobsContext';
import SingleJob from './SingleJob';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
	const { data } = useAllJobsContext();
	const { jobs, totalJobs, numOfPages } = data;

	// console.log(jobs);
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h4>
				{jobs.length} job{jobs.length > 1 && 's'} displayed (in {totalJobs} job
				{totalJobs > 1 && 's'} found total)
			</h4>
			<div className="jobs">
				{jobs.map((job: any) => {
					return <SingleJob key={job._id} {...job} />;
				})}
			</div>

			{/* display pagination when pages are above 1 */}
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 4rem;
	h2 {
		text-transform: none;
	}
	& > h4 {
		text-transform: none;

		font-weight: 600;
		margin-bottom: 1.5rem;
	}

	.jobs {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 2rem;
	}
	@media (min-width: 1120px) {
		.jobs {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}
`;

export default JobsContainer;
