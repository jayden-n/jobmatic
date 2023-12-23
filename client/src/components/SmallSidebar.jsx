import { useDashboardContext } from "../hooks/useDashboardContext";

const SmallSidebar = () => {
	const data = useDashboardContext();
	console.log(data);
	return <div>SmallSideBar</div>;
};
export default SmallSidebar;
