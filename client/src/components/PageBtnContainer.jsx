import styled from 'styled-components';
import { useAllJobsContext } from '../hooks/useAllJobsContext';
import {
	TbSquareRoundedArrowLeftFilled,
	TbSquareRoundedArrowRightFilled,
} from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';

const PageBtnContainer = () => {
	const {
		data: { numOfPages, currentPage },
	} = useAllJobsContext();

	// _ in cb func wants to access to the "undefined" from "length" (not needed)
	const pages = Array.from({ length: numOfPages }, (_, index) => {
		// array starts with 0, but numOfPages on server starts with 1
		return index + 1; // [1, 2, 3, 4, 5, ..., 10]
	});

	const { search, pathname } = useLocation();
	// console.log(search, pathname);
	const navigate = useNavigate();

	const handlePageChange = (pageNum) => {
		const searchParams = new URLSearchParams(search);
		// "page" is what server looking for current page
		// => to set in the URL
		searchParams.set('page', pageNum);
		navigate(`${pathname}?${searchParams.toString()}`);
	};

	return (
		<Wrapper>
			{/* PREV BUTTON */}
			<button
				className="btn prev-btn"
				onClick={() => {
					let prevPage = currentPage - 1;
					// if go back less than 1, it will go to page 10 (which is numOfPages)
					if (prevPage < 1) prevPage = numOfPages;
					handlePageChange(prevPage);
				}}
			>
				<TbSquareRoundedArrowLeftFilled size={25} />
				prev
			</button>

			{/* DISPLAYING PAGE NUMBERS */}
			<div className="btn-container">
				{pages.map((pageNum) => {
					return (
						<button
							key={pageNum}
							className={`btn page-btn ${pageNum === currentPage && 'active'}`}
							onClick={() => handlePageChange(pageNum)}
						>
							{pageNum}
						</button>
					);
				})}
			</div>

			{/* NEXT BUTTON */}
			<button
				className="btn next-btn"
				onClick={() => {
					let nextPage = currentPage + 1;
					// if go forward more than 1, it will go back to 1st page
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
