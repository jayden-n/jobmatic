import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDashboardContext } from "../hooks/useDashboardContext";
import styled from "styled-components";

const ThemeToggle = () => {
	const { isDarkTheme, toggleDarkTheme } = useDashboardContext();

	return (
		<Wrapper onClick={toggleDarkTheme}>
			{isDarkTheme ? (
				<BsFillSunFill className='toggle-icon' />
			) : (
				<BsFillMoonFill className='toggle-icon' />
			)}
		</Wrapper>
	);
};
const Wrapper = styled.button`
	cursor: pointer;
	background: transparent;
	border-color: transparent;
	width: 3.5rem;
	height: 2rem;
	display: grid;
	place-items: center;
	.toggle-icon {
		font-size: 1.15rem;
		color: var(--text-color);
	}
`;
export default ThemeToggle;
