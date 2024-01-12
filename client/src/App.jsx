import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
} from "./pages";
import { checkDefaultTheme } from "./utils/constants/constants";

// ===================== ACTIONS =====================
import { registerAction } from "./utils/actions/registerAction";
import { loginAction } from "./utils/actions/loginAction";
import { addJobAction } from "./utils/actions/addJobAction";

// ===================== LOADERS =====================
import { dashboardLoader } from "./utils/loaders/dashboardLoader";
import { allJobsLoader } from "./utils/loaders/allJobsLoader";

// if this true, it will be added to all of the pages
checkDefaultTheme();

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
				action: registerAction,
			},

			{
				path: "login",
				element: <LoginPage />,
				action: loginAction,
			},

			{
				path: "dashboard",
				element: <DashboardPage />,
				loader: dashboardLoader,
				children: [
					{
						index: true,
						element: <AddJobPage />,
						action: addJobAction,
					},
					{
						path: "stats",
						element: <StatsPage />,
					},
					{
						path: "admin",
						element: <AdminPage />,
					},
					{
						path: "all-jobs",
						element: <AllJobsPage />,
						loader: allJobsLoader,
					},
					{
						path: "profile",
						element: <ProfilePage />,
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
