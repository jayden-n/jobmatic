/* eslint-disable react/prop-types */
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

const FlowChart: React.FC = ({ data }) => {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<AreaChart data={data} margin={{ top: 50 }}>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="date" />
				<YAxis allowDecimals={false} />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />

				<Area
					type="monotone"
					dataKey="count"
					stroke="#fbbf24"
					fillOpacity={1}
					fill="url(#colorPv)"
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
};
export default FlowChart;
