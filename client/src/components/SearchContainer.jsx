import { Form, Link, useSubmit } from 'react-router-dom';
import styled from 'styled-components';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { useAllJobsContext } from '../hooks/useAllJobsContext';

const SearchContainer = () => {
	const { searchValues } = useAllJobsContext();
	const { search, jobStatus, jobType, sort } = searchValues;
	// console.log(searchValues);

	// submit on change with React-Router
	const submit = useSubmit();
	const handleOnChangeSubmit = (e) => {
		submit(e.currentTarget.form);
	};

	// debounce function
	const debounce = (onChange) => {
		let timeout;
		return (e) => {
			const form = e.currentTarget.form;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				onChange(form);
			}, 1200);
		};
	};

	return (
		<Wrapper>
			<Form className="form">
				<h4 className="form-title">search form</h4>

				<div className="form-center">
					<FormRow
						type="search"
						labelText="search for a position"
						name="search"
						defaultValue={search}
						onChange={debounce((form) => {
							submit(form);
						})}
					/>

					<FormRowSelect
						labelText="job status"
						name="jobStatus"
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue={jobStatus}
						onChange={handleOnChangeSubmit}
					/>

					<FormRowSelect
						labelText="job type"
						name="jobType"
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue={jobType}
						onChange={handleOnChangeSubmit}
					/>

					<FormRowSelect
						name="sort"
						defaultValue={sort}
						list={[...Object.values(JOB_SORT_BY)]}
						onChange={handleOnChangeSubmit}
					/>

					{/* Link to reset all the query params values in URL */}
					<Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
						Reset
					</Link>
				</div>
			</Form>
		</Wrapper>
	);
};
const Wrapper = styled.section`
	border-radius: var(--border-radius);
	width: 100%;
	background: var(--background-secondary-color);
	padding: 3rem 2rem 4rem;
	.form-title {
		margin-bottom: 2rem;
	}
	.form {
		margin: 0;
		border-radius: 0;
		box-shadow: none;
		padding: 0;
		max-width: 100%;
		width: 100%;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		row-gap: 1rem;
	}
	.form-btn {
		align-self: end;
		margin-top: 1rem;
		display: grid;
		place-items: center;
	}

	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 1rem;
		}
	}
	@media (min-width: 1120px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
`;

export default SearchContainer;
