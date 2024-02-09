import { Form, useNavigation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';

const RegisterPage: React.FC = () => {
	// checking state for submit button
	const navigation = useNavigation();
	const isSubmitting = navigation.state === 'submitting';

	return (
		<Wrapper>
			<Form method="post" className="form">
				<div className="logo">
					<Link to="/">
						<Logo />
					</Link>
				</div>
				<h4>Register</h4>

				<FormRow type="text" name="name" />
				<FormRow type="text" name="lastName" labelText="Last Name" />
				<FormRow type="text" name="location" />
				<FormRow type="email" name="email" />
				<FormRow type="password" name="password" />

				<button type="submit" className="btn btn-block" disabled={isSubmitting}>
					{isSubmitting ? 'submitting...' : 'submit'}
				</button>

				<p>
					Already a member?
					<Link to="/login" className="member-btn">
						Login
					</Link>
				</p>
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	align-items: center;

	.logo {
		display: block;
		margin: 0 auto;
		margin-bottom: 1.38rem;
	}

	.form {
		max-width: 450px;
		border-top: 5px solid var(--primary-500);
	}

	h4 {
		text-align: center;
		margin-bottom: 1.38rem;
	}

	p {
		margin-top: 1rem;
		text-align: center;
		line-height: 1.5;
	}
	.btn {
		margin-top: 1rem;
	}
	.member-btn {
		color: var(--primary-500);
		letter-spacing: var(--letter-spacing);
		margin-left: 0.25rem;
		text-decoration: underline;
	}
`;

export default RegisterPage;
