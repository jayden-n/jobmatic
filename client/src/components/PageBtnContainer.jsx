import styled from 'styled-components';
import { useAllJobsContext } from '../hooks/useAllJobsContext';
import {
	TbSquareRoundedArrowLeftFilled,
	TbSquareRoundedArrowRightFilled,
} from 'react-icons/tb';

const PageBtnContainer = () => {
	const {
		data: { numOfPages, currentPage },
	} = useAllJobsContext();

	// _ in cb func wants to access to the "undefined" from "length" (not needed)
	const pages = Array.from({ length: numOfPages }, (_, index) => {
		// array starts with 0, but numOfPages on server starts with 1
		return index + 1; // [1, 2, 3, 4, 5, ..., 10]
	});

	console.log(pages);
	return (
		<Wrapper>
			<button className="btn prev-btn">
				<TbSquareRoundedArrowLeftFilled size={25} />
				prev
			</button>

			<div className="btn-container">
				{pages.map((pageNum) => {
					return (
						<button
							key={pageNum}
							className={`btn page-btn ${pageNum === currentPage && 'active'}`}
						>
							{pageNum}
						</button>
					);
				})}
			</div>

			<button className="btn next-btn">
				next
				<TbSquareRoundedArrowRightFilled size={25} />
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.div``;
export default PageBtnContainer;
