import { Link } from "react-router-dom";
import { FormRow, Logo } from "../components";

const LoginPage = () => {
	return (
		<>
			<form className='form'>
				<Logo />
				<h4>login</h4>
				<FormRow type='email' name='email' defaultValue='jayden@gmail.com' />
				<FormRow type='password' name='password' defaultValue='secret123' />

				<button type='submit' className='btn btn-block'>
					submit
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
			</form>
		</>
	);
};
export default LoginPage;
