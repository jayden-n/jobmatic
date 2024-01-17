/* eslint-disable react/prop-types */
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { createContext, useState } from "react";
import { checkDefaultTheme } from "../utils/constants/constants";
import customFetch from "../utils/api/customFetch";
import { toast } from "react-toastify";

export const DashboardContext = createContext();

const DashboardPage = () => {
	// pre-fetching user data with loader:
	const data = useLoaderData();
	const navigate = useNavigate();

	// getting user data from database
	const user = data?.user;
	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);

		document.body.classList.toggle("dark-theme", newDarkTheme);
		localStorage.setItem("darkTheme", newDarkTheme);
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const logoutUser = async () => {
		navigate("/");

		// clears out the cookie
		await customFetch.get("/auth/logout");
		toast.success("Logging out...");
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
							{/* passing user context value to any children */}
							<Outlet context={{ user }} />
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
