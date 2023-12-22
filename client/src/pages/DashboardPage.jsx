import { Outlet } from "react-router-dom";

const DashboardPage = () => {
	return (
		<>
			{/* Outlet for children */}
			<Outlet />
		</>
	);
};
export default DashboardPage;
