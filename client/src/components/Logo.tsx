import React from 'react';
import styled from 'styled-components';

const Logo: React.FC = () => {
	// return <img src={logo} alt="jobmatic" className="logo" />;
	return (
		<Wrapper>
			<p className="logo main-logo">
				<span className="letter-logo">J</span>obMatic
			</p>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.main-logo {
		letter-spacing: 0.1rem;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--primary-500);
	}
	.letter-logo {
		font-size: 3.8rem;
	}
`;
export default Logo;
