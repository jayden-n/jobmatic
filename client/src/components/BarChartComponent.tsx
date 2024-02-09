/* eslint-disable react/prop-types */
import React from 'react';
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
import { IChartsContainer } from './ChartsContainer';

const BarChartComponent: React.FC<IChartsContainer> = ({ data }) => {
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
