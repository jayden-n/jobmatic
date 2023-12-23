import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useContext, useState } from "react";

export const DashboardContext = createContext();

const DashboardPage = () => {
	// temp
	const user = { name: "jayden" };
	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleDarkTheme = () => {
		console.log("toggle dark theme");
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		console.log("logout user");
	};

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				logoutUser,
			}}
		>
			<Wrapper>
				<main className='dashboard'>
					<SmallSidebar />
					<BigSidebar />

					<div>
						<Navbar />
						<div className='dashboard-page'>
							{/* Outlet for children */}
							<Outlet />
						</div>
					</div>
				</main>
			</Wrapper>
		</DashboardContext.Provider>
	);
};

const Wrapper = styled.section`
	.dashboard {
		display: grid;
		grid-template-columns: 1fr;
	}
	.dashboard-page {
		width: 90vw;
		margin: 0 auto;
		padding: 2rem 0;
	}

	@media (min-width: 992px) {
		.dashboard {
			grid-template-columns: auto 1fr;
		}
		.dashboard-page {
			width: 90%;
		}
	}
`;

export default DashboardPage;
