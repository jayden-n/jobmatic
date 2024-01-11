import { Form, Link, useNavigation, useActionData } from "react-router-dom";
import { FormRow, Logo } from "../components";
import styled from "styled-components";

const LoginPage = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const errors = useActionData();

	return (
		<Wrapper>
			<Form method='post' className='form'>
				<Logo />
				<h4>login</h4>
				{errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
				<FormRow type='email' name='email' defaultValue='jayden@gmail.com' />
				<FormRow type='password' name='password' defaultValue='secret123' />

				<button type='submit' className='btn btn-block' disabled={isSubmitting}>
					{isSubmitting ? "submitting..." : "submit"}
				</button>

				<button type='submit' className='btn btn-block'>
					explore the app
				</button>

				<p>
					Not a member yet?
					<Link to='/register' className='member-btn'>
						Register
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
		max-width: 400px;
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
export default LoginPage;
