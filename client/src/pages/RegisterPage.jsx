import { Link } from "react-router-dom";
import styled from "styled-components";
import { FormRow, Logo } from "../components";

const RegisterPage = () => {
	return (
		<Wrapper>
			<form className='form'>
				<Logo />
				<h4>Register</h4>

				<FormRow type='text' name='name' defaultValue='jayden' />
				<FormRow
					type='text'
					name='lastName'
					labelText='Last Name'
					defaultValue='nguyen'
				/>
				<FormRow type='text' name='location' defaultValue='earth' />
				<FormRow type='email' name='email' defaultValue='jayden@gmail.com' />
				<FormRow type='password' name='password' defaultValue='secret123' />

				<button type='submit' className='btn btn-block'>
					Submit
				</button>

				<p>
					Already a member?
					<Link to='/login' className='member-btn'>
						Login
					</Link>
				</p>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.section``;
export default RegisterPage;
