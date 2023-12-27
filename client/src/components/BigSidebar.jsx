import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useDashboardContext } from "../hooks/useDashboardContext";
import styled from "styled-components";

const BigSidebar = () => {
	const { showSidebar } = useDashboardContext();

	return (
		<Wrapper>
			<div
				className={
					showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
				}
			>
				<div className='content'>
					<header>
						<Logo />
					</header>
					<NavLinks isBigSidebar />
				</div>
			</div>
		</Wrapper>
	);
};
const Wrapper = styled.div``;
export default BigSidebar;
