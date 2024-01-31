/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { BigSidebar, Navbar, SmallSidebar, Loading } from '../components';
import { createContext, useState } from 'react';
import { checkDefaultTheme } from '../utils/constants/constants';
import customFetch from '../utils/api/customFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const userQuery = {
	queryKey: ['user'],
	queryFn: async () => {
		const { data } = await customFetch.get('/users/current-user');
		return data;
	},
};

export const dashboardLoader = (queryClient) => async () => {
	try {
		// ensure cached data
		return await queryClient.ensureQueryData(userQuery);
	} catch (error) {
		// if any issues with JWT, send user back to homepage
		return redirect('/');
	}
};

export const DashboardContext = createContext();
const DashboardPage = (queryClient) => {
	// getting current user without requesting data from server when navigating around app
	const { user } = useQuery(userQuery).data;

	const navigate = useNavigate();

	// global loading
	const navigation = useNavigation();
	const isPageLoading = navigation.state === 'loading';

	const [showSidebar, setShowSidebar] = useState(false);
	const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);

		document.body.classList.toggle('dark-theme', newDarkTheme);
		localStorage.setItem('darkTheme', newDarkTheme);
	};

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const onLogoutUser = async () => {
		navigate('/');

		// clears out the cookie
		await customFetch.get('/auth/logout');

		// validate correct user
		queryClient.invalidateQueries();

		toast.success('Logged out successfully!');
	};

	return (
		<DashboardContext.Provider
			value={{
				user,
				showSidebar,
				isDarkTheme,
				toggleDarkTheme,
				toggleSidebar,
				onLogoutUser,
			}}
		>
			<Wrapper>
				<main className="dashboard">
					<SmallSidebar />
					<BigSidebar />

					<div>
						<Navbar />
						<div className="dashboard-page">
							{/* Outlet for children */}
							{/* passing user context value to any children */}

							{isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
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
