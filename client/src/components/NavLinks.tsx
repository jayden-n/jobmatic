/* eslint-disable react/prop-types */
import { useDashboardContext } from '../hooks/useDashboardContext';
import { NavLink } from 'react-router-dom';
import { links } from '../utils/constants/links';

const NavLinks = ({ isBigSidebar }: { isBigSidebar: boolean }) => {
	const { toggleSidebar, user } = useDashboardContext();

	return (
		<div className="nav-links">
			{links.map((link) => {
				const { text, path, icon } = link;
				// nullish coalescing operator to handle undefined user
				const { role } = user ?? {};

				{
					/* confirm if user is admin or not to display admin */
				}
				if (path === 'admin' && role !== 'admin') return;

				return (
					<NavLink
						to={path}
						key={text}
						className="nav-link"
						onClick={isBigSidebar ? undefined : toggleSidebar}
						// end: do not set current child to be 'active'
						end
					>
						<span className="icon">{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};
export default NavLinks;
