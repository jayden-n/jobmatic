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
import { checkDefaultTheme } from "./utils/constants";

// ===================== ACTIONS =====================
import { registerAction } from "../../utils/registerAction";
import { loginAction } from "../../utils/loginAction";

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
				children: [
					{
						index: true,
						element: <AddJobPage />,
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
