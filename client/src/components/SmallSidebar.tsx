import { FaTimes } from 'react-icons/fa';
import { useDashboardContext } from '../hooks/useDashboardContext';
import Logo from './Logo';
import styled from 'styled-components';
import NavLinks from './NavLinks';

const SmallSidebar: React.FC = () => {
	const { showSidebar, toggleSidebar } = useDashboardContext();

	return (
		<Wrapper>
			<div
				className={
					showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
				}
			>
				<div className="content">
					<button type="button" className="close-btn" onClick={toggleSidebar}>
						<FaTimes />
					</button>
					<header>
						<Logo />
					</header>
					<NavLinks isBigSidebar />
				</div>
			</div>
		</Wrapper>
	);
};
const Wrapper = styled.aside`
	@media (min-width: 992px) {
		display: none;
	}

	.sidebar-container {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -1;
		opacity: 0;
		transition: var(--transition);
		visibility: hidden;
	}
	.show-sidebar {
		z-index: 99;
		opacity: 1;
		visibility: visible;
	}
	.content {
		background: var(--background-secondary-color);
		width: var(--fluid-width);
		height: 95vh;
		border-radius: var(--border-radius);
		padding: 4rem 2rem;
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.close-btn {
		cursor: pointer;
		position: absolute;
		top: 10px;
		left: 10px;
		background: transparent;
		border-color: transparent;
		font-size: 2rem;
		color: var(--red-dark);
	}
	.nav-links {
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
	}
	.nav-link {
		display: flex;
		align-items: center;
		color: var(--text-secondary-color);
		padding: 1.5rem 0;
		padding-left: 2.5rem;
		text-transform: capitalize;
		transition: padding-left 0.3s ease-in-out;
		width: 280px;
		border-bottom-right-radius: 9999px;
		border-top-right-radius: 9999px;
	}
	.nav-link:hover {
		padding-left: 3.5rem;
		border-bottom-right-radius: 9999px;
		border-top-right-radius: 9999px;
		background: var(--background-color);
		color: var(--primary-500);
		transition: var(--transition);
	}
	.icon {
		font-size: 1.5rem;
		margin-right: 1rem;
		display: grid;
		place-items: center;
	}
	.active {
		color: var(--primary-500);
	}
`;

export default SmallSidebar;
