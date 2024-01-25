import { Form, Link } from 'react-router-dom';
import styled from 'styled-components';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

const SearchContainer = () => {
	return (
		<Wrapper>
			<Form className="form">
				<h5 className="form-title">search form</h5>

				<div className="form-center">
					<FormRow type="search" name="search" defaultValue="a" />
					<FormRowSelect
						labelText="job status"
						name="jobStatus"
						list={['all', ...Object.values(JOB_STATUS)]}
						defaultValue="all"
					/>
					<FormRowSelect
						labelText="job type"
						name="jobType"
						list={['all', ...Object.values(JOB_TYPE)]}
						defaultValue="all"
					/>
					<FormRowSelect
						name="sort"
						defaultValue="newest"
						list={[...Object.values(JOB_SORT_BY)]}
					/>
					<Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
						Reset Search Values
					</Link>
					{/* TEMP !!! */}
					<button type="submit">okay</button>
				</div>
			</Form>
		</Wrapper>
	);
};
const Wrapper = styled.div``;
export default SearchContainer;
