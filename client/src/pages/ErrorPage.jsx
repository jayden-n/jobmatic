import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

import img from "../assets/images/not-found.svg";

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);
	if (error.status === 404) {
		return (
			<Wrapper>
				<div>
					<img src={img} alt='404 not found' />
					<h3>uh oh! page not found</h3>
					<p>We cannot seem to find the page you are looking for</p>
					<Link to='/dashboard'>back home</Link>
				</div>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<div className='default-content'>
				<h3>Something went wrong</h3>
				<Link to='/'>Back home</Link>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	min-height: 100vh;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 90vw;
		max-width: 600px;
		display: block;
		margin-bottom: 2rem;
		margin-top: -3rem;
	}
	h3 {
		margin-bottom: 0.5rem;
	}
	p {
		line-height: 1.5;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
		color: var(--text-secondary-color);
	}
	a {
		color: var(--primary-500);
		text-transform: capitalize;
		text-decoration: underline;
	}
`;
export default ErrorPage;
