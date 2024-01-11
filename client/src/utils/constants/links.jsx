import { FaWpforms } from "react-icons/fa";
import { MdAdminPanelSettings, MdQueryStats } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

export const links = [
	{
		text: "add job",
		path: ".",
		icon: <FaWpforms />,
	},
	{
		text: "all jobs",
		path: "all-jobs",
		icon: <MdQueryStats />,
	},
	{
		text: "stats",
		path: "stats",
		icon: <IoBarChartSharp />,
	},
	{
		text: "profile",
		path: "profile",
		icon: <ImProfile />,
	},
	{
		text: "admin",
		path: "admin",
		icon: <MdAdminPanelSettings />,
	},
];
