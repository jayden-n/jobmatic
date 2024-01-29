import styled from 'styled-components';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<Wrapper>
			<div className="container page">
				<div className="info">
					<h1>
						<i className="welcome"> Welcome to</i> <span>JobMatic</span>
					</h1>
					<p>
						Meet JobMatic - your new job tracking application buddy! 🌟 Keep
						things simple: manage, update, and track all your applications
						effortlessly. Ready to simplify your job hunting? Check out JobMatic
						now!
					</p>
					<Link to="/register" className="btn register-link">
						Register
					</Link>
					<Link to="/login" className="btn">
						Login / Demo Usage
					</Link>
				</div>

				<img src={main} alt="landing image" className="img main-img" />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	.page {
		min-height: calc(100vh - var(--nav-height));
		display: grid;
		align-items: center;
		margin-top: 3rem;
	}

	h1 {
		font-weight: 700;
		margin-left: -0.5rem;
		.welcome {
			text-transform: none;
		}
		span {
			color: var(--primary-500);
		}
		margin-bottom: 1.5rem;
	}

	p {
		line-height: 2;
		color: var(--text-secondary-color);
		margin-bottom: 1.5rem;
		max-width: 38em;
		font-size: 1.15rem;
	}

	.register-link {
		margin-right: 1rem;
	}

	.main-img {
		display: none;
	}
	.btn {
		padding: 0.75rem 1rem;
	}

	@media (min-width: 992px) {
		.page {
			grid-template-columns: 1fr 400px;
			column-gap: 3rem;
		}
		.main-img {
			display: block;
		}
	}
`;

export default LandingPage;
