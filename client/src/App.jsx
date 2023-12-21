import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
	HomePage,
	LandingPage,
	LoginPage,
	RegisterPage,
	DashboardPage,
} from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		children: [
			{
				index: true,
				element: <LandingPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},

			{
				path: "login",
				element: <LoginPage />,
			},

			{
				path: "dashboard",
				element: <DashboardPage />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
