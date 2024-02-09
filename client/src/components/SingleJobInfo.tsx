import React from 'react';
import styled from 'styled-components';

interface ISingleJobInfoProps {
	icon: React.ReactNode;
	text: string;
}

const SingleJobInfo: React.FC<ISingleJobInfoProps> = ({ icon, text }) => {
	return (
		<Wrapper>
			<span className="job-icon">{icon}</span>
			<span className="job-text">{text}</span>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	.job-icon {
		font-size: 1rem;
		margin-right: 1rem;
		display: flex;
		align-items: center;
		svg {
			color: var(--text-secondary-color);
		}
	}

	.job-text {
		text-transform: capitalize;
		/* letter-spacing: var(--letter-spacing); */
	}
`;
export default SingleJobInfo;
