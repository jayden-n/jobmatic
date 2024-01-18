import {
	Form,
	Link,
	useNavigation,
	useActionData,
	useNavigate,
} from "react-router-dom";
import { FormRow, Logo } from "../components";
import styled from "styled-components";
import customFetch from "../utils/api/customFetch";
import { toast } from "react-toastify";

const LoginPage = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const errors = useActionData();

	const navigate = useNavigate();

	// for demo user purpose
	const loginDemoUser = async () => {
		const demoData = {
			email: "test@test.com",
			password: "secret123",
		};
		try {
			await customFetch.post("/auth/login", demoData);
			toast.success("Demo user is in the building!");
			navigate("/dashboard");
		} catch (error) {
			toast.error(error?.response?.data?.msg);
		}
	};

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

				<button type='submit' className='btn btn-block' onClick={loginDemoUser}>
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
