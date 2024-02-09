import React from 'react';
import styled from 'styled-components';
import {
	TbSquareRoundedArrowLeftFilled,
	TbSquareRoundedArrowRightFilled,
} from 'react-icons/tb';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../hooks/useAllJobsContext';

const PageBtnContainer: React.FC = () => {
	const {
		data: { numOfPages, currentPage },
	} = useAllJobsContext();

	const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

	const { search, pathname } = useLocation();
	const navigate: NavigateFunction = useNavigate();

	const handlePageChange = (pageNum: number) => {
		const searchParams = new URLSearchParams(search);
		searchParams.set('page', pageNum.toString());
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	return (
		<Wrapper>
			<button
				className="btn prev-btn"
				onClick={() => {
					let prevPage = currentPage - 1;
					if (prevPage < 1) prevPage = numOfPages;
					handlePageChange(prevPage);
				}}
			>
				<TbSquareRoundedArrowLeftFilled size={25} />
				prev
			</button>

			<div className="btn-container">
				{pages.map((pageNum) => (
					<button
						key={pageNum}
						className={`btn page-btn ${pageNum === currentPage && 'active'}`}
						onClick={() => handlePageChange(pageNum)}
					>
						{pageNum}
					</button>
				))}
			</div>

			<button
				className="btn next-btn"
				onClick={() => {
					let nextPage = currentPage + 1;
					if (nextPage > numOfPages) nextPage = 1;
					handlePageChange(nextPage);
				}}
			>
				next
				<TbSquareRoundedArrowRightFilled size={25} />
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	height: 6rem;
	margin-top: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;

	.btn-container {
		background: var(--background-secondary-color);
		border-radius: var(--border-radius);
		display: flex;
	}

	.page-btn {
		background: transparent;
		border-color: transparent;
		width: 50px;
		height: 40px;
		font-weight: 700;
		font-size: 1.25rem;
		color: var(--primary-500);
		border-radius: var(--border-radius);
		cursor: pointer;
	}

	.active {
		background: var(--primary-500);
		color: var(--white);
	}

	.prev-btn,
	.next-btn {
		background: var(--background-secondary-color);
		border-color: transparent;
		border-radius: var(--border-radius);
		width: 100px;
		height: 40px;
		color: var(--primary-500);
		text-transform: capitalize;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.prev-btn:hover,
	.next-btn:hover {
		background: var(--primary-500);
		color: var(--white);
		transition: var(--transition);
	}
`;
export default PageBtnContainer;
