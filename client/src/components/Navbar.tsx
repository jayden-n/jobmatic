import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../hooks/useDashboardContext';
import styled from 'styled-components';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
import React from 'react';

const Navbar: React.FC = () => {
	const { toggleSidebar } = useDashboardContext();
	return (
		<Wrapper>
			<div className="nav-center">
				<button type="button" className="toggle-btn" onClick={toggleSidebar}>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h5 className="logo-text">dashboard</h5>
				</div>

				<div className="btn-container">
					<ThemeToggle />

					<LogoutContainer />
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.nav`
	height: var(--nav-height);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
	background: var(--background-secondary-color);
	.nav-center {
		display: flex;
		width: 90vw;
		align-items: center;
		justify-content: space-between;
	}
	.toggle-btn {
		background: transparent;
		border-color: transparent;
		font-size: 1.75rem;
		color: var(--primary-500);
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.logo-text {
		display: none;
	}
	.logo {
		font-size: 1.8rem;
		width: 150px;
	}
	.letter-logo {
		font-size: 3.4rem;
	}
	.btn-container {
		display: flex;
		align-items: center;
	}

	@media (min-width: 992px) {
		position: sticky;
		top: 0;
		.nav-center {
			width: 90%;
		}
		.logo {
			display: none;
		}
		.logo-text {
			display: block;
		}
	}
`;
export default Navbar;
