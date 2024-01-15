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

const Wrapper = styled.article`
	background: var(--background-secondary-color);
	border-radius: var(--border-radius);
	display: grid;
	grid-template-rows: 1fr auto;
	box-shadow: var(--shadow-2);
	header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--grey-100);
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
	}
	.main-icon {
		width: 60px;
		height: 60px;
		display: grid;
		place-items: center;
		background: var(--primary-500);
		border-radius: var(--border-radius);
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--white);
		margin-right: 2rem;
	}

	.info {
		h5 {
			margin-bottom: 0.5rem;
		}
		p {
			margin: 0;
			text-transform: capitalize;
			letter-spacing: var(--letter-spacing);
			color: var(--text-secondary-color);
		}
	}
	.content {
		padding: 1.5rem;
	}
	.content-center {
		display: grid;
		margin-top: 1rem;
		margin-bottom: 1.5rem;
		grid-template-columns: 1fr;
		row-gap: 1.5rem;
		align-items: center;
		@media (min-width: 576px) {
			grid-template-columns: 1fr 1fr;
		}
	}
	.status {
		border-radius: var(--border-radius);
		text-transform: capitalize;
		text-align: center;
		width: 100px;
		height: 30px;
		display: grid;
		place-items: center;
	}
	.actions {
		display: flex;
		align-items: center;
		margin-top: 1rem;
	}
	.edit-btn,
	.delete-btn {
		height: 30px;
		font-size: 0.85rem;
		display: flex;
		align-items: center;
	}
	.edit-btn {
		margin-right: 0.5rem;
	}
`;

export default SingleJob;
