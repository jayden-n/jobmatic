import { FaWpforms } from 'react-icons/fa';
import { MdAdminPanelSettings, MdQueryStats } from 'react-icons/md';
import { IoBarChartSharp } from 'react-icons/io5';
import { ImProfile } from 'react-icons/im';

export const links = [
	{
		text: 'profile',
		path: '.',
		icon: <ImProfile />,
	},
	{
		text: 'add job',
		path: 'add-job',
		icon: <FaWpforms />,
	},
	{
		text: 'all jobs',
		path: 'all-jobs',
		icon: <MdQueryStats />,
	},
	{
		text: 'stats',
		path: 'stats',
		icon: <IoBarChartSharp />,
	},
	{
		text: 'admin',
		path: 'admin',
		icon: <MdAdminPanelSettings />,
	},
];
