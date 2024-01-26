import styled from 'styled-components';
import { useAllJobsContext } from '../hooks/useAllJobsContext';
import SingleJob from './SingleJob';

const JobsContainer = () => {
	const { data } = useAllJobsContext();
	const { jobs } = data;
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
			<div className="jobs">
				{jobs.map((job) => {
					return <SingleJob key={job._id} {...job} />;
				})}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 4rem;
	.h2 {
		text-transform: none;
	}
	& > h5 {
		font-weight: 700;
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
