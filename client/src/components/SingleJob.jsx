/* eslint-disable react/prop-types */
import styled from "styled-components";

import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import SingleJobInfo from "./SingleJobInfo";

const SingleJob = ({
	_id,
	position,
	company,
	jobLocation,
	jobType,
	createdAt,
	jobStatus,
}) => {
	const date = day(createdAt).format("MMMM D, YYYY");
	return (
		<Wrapper>
			<header>
				<div className='main-icon'>{company.charAt(0)}</div>
				<div className='info'>
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className='content'>
				<div className='content-center'>
					<SingleJobInfo icon={<FaLocationArrow />} text={jobLocation} />
					<SingleJobInfo icon={<FaCalendarAlt />} text={date} />
					<SingleJobInfo icon={<FaBriefcase />} text={jobType} />

					<div className={`status ${jobStatus}`}>{jobStatus}</div>
				</div>
				<footer className='actions'>
					<Link className='btn edit-btn'>Edit</Link>
					<Form>
						<button type='submit' className='btn delete-btn'>
							Delete
						</button>
					</Form>
				</footer>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	color: red;
`;

export default SingleJob;
