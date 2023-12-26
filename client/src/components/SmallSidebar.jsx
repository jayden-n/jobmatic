import { FaTimes } from "react-icons/fa";
import { useDashboardContext } from "../hooks/useDashboardContext";
import Logo from "./Logo";
import { links } from "../utils/links";
import { NavLink } from "react-router-dom";

const SmallSidebar = () => {
	const data = useDashboardContext();

	return (
		<div>
			<div className='sidebar-container show-container'>
				<div className='content'>
					<button type='button' className='close-btn'>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>

					<div className='nav-links'>
						{links.map((link) => {
							const { text, path, icon } = link;
							return (
								<NavLink to={path} key={text} className='nav-link'>
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
