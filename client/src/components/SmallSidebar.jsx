import { FaTimes } from "react-icons/fa";
import { useDashboardContext } from "../hooks/useDashboardContext";
import Logo from "./Logo";
import { links } from "../utils/links";
import { NavLink } from "react-router-dom";

const SmallSidebar = () => {
	const { showSidebar, toggleSidebar } = useDashboardContext();

	return (
		<div>
			<div
				className={
					showSidebar ? "sidebar-container show-container" : "sidebar-container"
				}
			>
				<div className='content'>
					<button type='button' className='close-btn' onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>

					<div className='nav-links'>
						{links.map((link) => {
							const { text, path, icon } = link;
							return (
								<NavLink
									to={path}
									key={text}
									className='nav-link'
									onClick={toggleSidebar}
									// end: do not set current child to be 'active'
									end
								>
									<span className='icon'>{icon}</span>
									{text}
								</NavLink>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default SmallSidebar;
