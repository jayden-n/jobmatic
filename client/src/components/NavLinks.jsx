/* eslint-disable react/prop-types */
import { useDashboardContext } from "../hooks/useDashboardContext";

import { NavLink } from "react-router-dom";
import { links } from "../utils/constants/links";

const NavLinks = ({ isBigSidebar }) => {
	const { toggleSidebar, user } = useDashboardContext();
	return (
		<div className='nav-links'>
			{links.map((link) => {
				const { text, path, icon } = link;
				return (
					<NavLink
						to={path}
						key={text}
						className='nav-link'
						onClick={isBigSidebar ? null : toggleSidebar}
						// end: do not set current child to be 'active'
						end
					>
						<span className='icon'>{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};
export default NavLinks;
