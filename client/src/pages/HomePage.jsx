import { Outlet } from "react-router-dom";

const HomePage = () => {
	return (
		<>
			<nav>navbar</nav>

			{/* Outlet are children */}
			<Outlet />
		</>
	);
};
export default HomePage;
