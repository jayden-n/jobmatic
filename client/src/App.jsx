//  ===================== COMPONENT IMPORTS  =====================
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
	HomePage,
	LandingPage,
	LoginPage,
	RegisterPage,
	DashboardPage,
	ErrorPage,
	AddJobPage,
	AdminPage,
	AllJobsPage,
	ProfilePage,
	StatsPage,
	EditJobPage,
} from './pages';
import { checkDefaultTheme } from './utils/constants/constants';
import ErrorElement from './components/ErrorElement';

// ===================== ACTIONS =====================
import { registerAction } from './utils/actions/registerAction';
import { addJobAction } from './utils/actions/addJobAction';
import { loginAction } from './pages/LoginPage';

// ===================== LOADERS =====================
import { dashboardLoader } from './pages/DashboardPage';
import { allJobsLoader } from './utils/loaders/allJobsLoader';

// ===================== IN-COMPONENT ACTIONS/LOADERS =====================
import { loader as editJobLoader } from '../src/pages/EditJobPage';
import { loader as adminLoader } from './pages/AdminPage';
import { loader as statsLoader } from './pages/StatsPage';
import { action as editJobAction } from '../src/pages/EditJobPage';
import { action as deleteJobAction } from '../src/pages/DeleteJobPage';
import { action as profileAction } from '../src/pages/ProfilePage';

// ===================== REACT QUERY  =====================
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// if this true, it will be added to all of the pages
checkDefaultTheme();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// cached time for each request
			staleTime: 1000 * 60 * 3, // milliseconds => data will be cached for 3 minutes before requesting to server again
		},
	},
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
				action: registerAction,
			},

			{
				path: 'login',
				element: <LoginPage />,
				action: loginAction(queryClient),
			},

			{
				path: 'dashboard',
				element: <DashboardPage queryClient={queryClient} />,
				loader: dashboardLoader(queryClient),
				children: [
					{
						index: true,
						element: <ProfilePage />,
						action: profileAction(queryClient),
					},
					{
						path: 'add-job',
						element: <AddJobPage />,
						action: addJobAction,
					},
					{
						path: 'stats',
						element: <StatsPage />,
						loader: statsLoader(queryClient),
						// error handling: not navigating users away
						errorElement: <ErrorElement />,
					},
					{
						path: 'admin',
						element: <AdminPage />,
						loader: adminLoader,
					},
					{
						path: 'all-jobs',
						element: <AllJobsPage />,
						loader: allJobsLoader,
					},
					{
						path: 'edit-job/:id',
						element: <EditJobPage />,
						// get a specific job when load the page
						loader: editJobLoader,
						// make a patch request back to the server
						action: editJobAction,
					},
					{
						path: 'delete-job/:id',
						action: deleteJobAction,
					},
				],
			},
		],
	},
]);

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
export default App;
