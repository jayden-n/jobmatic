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

// ===================== ACTIONS =====================
import { registerAction } from './utils/actions/registerAction';
import { loginAction } from './utils/actions/loginAction';
import { addJobAction } from './utils/actions/addJobAction';

// ===================== LOADERS =====================
import { dashboardLoader } from './utils/loaders/dashboardLoader';
import { allJobsLoader } from './utils/loaders/allJobsLoader';

// ===================== IN-COMPONENT ACTIONS/LOADERS =====================
import { loader as editJobLoader } from '../src/pages/EditJobPage';
import { loader as adminLoader } from './pages/AdminPage';
import { loader as statsLoader } from './pages/StatsPage';
import { action as editJobAction } from '../src/pages/EditJobPage';
import { action as deleteJobAction } from '../src/pages/DeleteJobPage';
import { action as profileAction } from '../src/pages/ProfilePage';

// if this true, it will be added to all of the pages
checkDefaultTheme();

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
				action: loginAction,
			},

			{
				path: 'dashboard',
				element: <DashboardPage />,
				loader: dashboardLoader,
				children: [
					{
						index: true,
						element: <AddJobPage />,
						action: addJobAction,
					},
					{
						path: 'stats',
						element: <StatsPage />,
						loader: statsLoader,
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
						path: 'profile',
						element: <ProfilePage />,
						action: profileAction,
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
	return <RouterProvider router={router} />;
};
export default App;
