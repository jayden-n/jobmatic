/* eslint-disable react/prop-types */
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from 'recharts';

const BarChartComponent = ({ data }) => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data} margin={{ top: 50 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis allowDecimals={false} />
				<Tooltip />
				<Legend />

				<Bar dataKey="count" fill="#fbbf24" barSize={75} />
			</BarChart>
		</ResponsiveContainer>
	);
};
export default BarChartComponent;
