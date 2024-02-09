/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { UserType } from '../../../models/UserModel';

interface IStatItem {
	count: number;
	title: string;
	color: string;
	bcg: string;
	icon: React.ReactNode;
}

const StatItem: React.FC<IStatItem> = ({ count, title, icon, color, bcg }) => {
	return (
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className="count">{count}</span>
				<span className="icon">{icon}</span>
			</header>

			<h5 className="title">{title}</h5>
		</Wrapper>
	);
};

const Wrapper = styled.article`
	padding: 2rem;
	border-radius: var(--border-radius);
	background: var(--background-secondary-color);
	/* passing props thru function */
	border-bottom: 5px solid ${(props: IStatItem) => props.color};

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.count {
		display: block;
		font-weight: 700;
		font-size: 50px;
		/* passing props thru function */
		color: ${(props: IStatItem) => props.color};
		line-height: 2;
	}

	.title {
		margin: 0;
		text-transform: capitalize;
		text-align: left;
		margin-top: 0.5rem;
		font-size: 1.25rem;
	}
	.icon {
		width: 70px;
		height: 60px;
		background: ${(props: IStatItem) => props.bcg};
		border-radius: var(--border-radius);
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 2rem;
			color: ${(props: IStatItem) => props.color};
		}
	}
`;
export default StatItem;
