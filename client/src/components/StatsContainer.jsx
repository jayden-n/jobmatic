/* eslint-disable react/prop-types */
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StatItem from './StatItem';
import styled from 'styled-components';

const StatsContainer = ({ defaultStats }) => {
	const { pending, interview, declined } = defaultStats;

	const stats = [
		{
			title: 'pending applications',
			count: pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#f59e0b',
			bcg: '#fef3c7',
		},
		{
			title: 'interview scheduled',
			count: interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bcg: '#e0e8f9',
		},
		{
			title: 'declined',
			count: declined || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bcg: '#ffeeee',
		},
	];

	return (
		<Wrapper>
			{stats.map((item) => {
				return <StatItem key={item.title} {...item} />;
			})}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	display: grid;
	row-gap: 2rem;
	@media (min-width: 769px) {
		grid-template-columns: 1fr 1fr;
		column-gap: 1rem;
	}
	@media (min-width: 1120px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
`;
export default StatsContainer;
