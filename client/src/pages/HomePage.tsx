import { Outlet } from 'react-router-dom';

const HomePage: React.FC = () => {
	return (
		<>
			{/* Outlet are children */}
			<Outlet />
		</>
	);
};
export default HomePage;
