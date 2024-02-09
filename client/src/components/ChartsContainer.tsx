/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import FlowChart from './FlowChart';
import BarChartComponent from './BarChartComponent';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { UserType } from '../../../models/UserModel';

export interface IChartsContainer {
	data: [
		{
			count: number;
			date: string;
		},
	];
}

const ChartsContainer: React.FC<IChartsContainer> = ({ data }) => {
	const [barChart, setBarChart] = useState(true);
	const { user } = useOutletContext() as { user: UserType };

	return (
		<Wrapper>
			<div className="user">
				<span className="user-info">
					{user?.name} {user?.lastName}
				</span>
				&apos;s
				<span className="monthly"> monthly applications</span>
			</div>

			<button type="button" onClick={() => setBarChart(!barChart)}>
				{barChart ? 'switch to bar chart' : 'switch to flow chart'}
			</button>

			{barChart ? <FlowChart data={data} /> : <BarChartComponent data={data} />}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin-top: 5rem;
	text-align: center;

	button {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		color: var(--primary-500);
		font-size: 1.25rem;
		cursor: pointer;
	}
	h4 {
		text-align: center;
		margin-bottom: 0.75rem;
		text-transform: capitalize;
	}
	.user {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	.user-info {
		text-transform: capitalize;
	}
	.monthly {
		text-transform: capitalize;
	}
`;
export default ChartsContainer;
