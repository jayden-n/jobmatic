import { Form, useNavigation, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { FormRow } from "../components";

const ProfilePage = () => {
	const { user } = useOutletContext();
	const { email, lastName, location, name, role } = user;

	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<Wrapper>
			<Form method='post' className='form' encType='multipart/form-data'>
				<h4 className='form-title'>profile</h4>
				<div className='form-center'>
					{/* file input */}
					<div className='form-row'>
						<label htmlFor='avatar' className='form-label'>
							Select an image file (max 0.5 MB)
						</label>
						<input
							type='file'
							id='avatar'
							name='avatar'
							className='form-input'
							// accept any image file
							accept='image/*'
						/>
					</div>
					<FormRow type='text' name='name' defaultValue={name} />
					<FormRow
						type='text'
						name='lastName'
						labelText='last Name'
						defaultValue={lastName}
					/>
					<FormRow type='email' name='email' defaultValue={email} />
					<FormRow type='text' name='location' defaultValue={location} />
					<button
						type='submit'
						disabled={isSubmitting}
						className='btn btn-block form-btn'
					>
						{isSubmitting ? "submitting..." : "submit"}
					</button>
				</div>
			</Form>
		</Wrapper>
	);
};
const Wrapper = styled.section`
	border-radius: var(--border-radius);
	width: 100%;
	background: var(--background-secondary-color);
	padding: 3rem 2rem 4rem;
	.form-title {
		margin-bottom: 2rem;
	}
	.form {
		margin: 0;
		border-radius: 0;
		box-shadow: none;
		padding: 0;
		max-width: 100%;
		width: 100%;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		row-gap: 1rem;
	}
	.form-btn {
		align-self: end;
		margin-top: 1rem;
		display: grid;
		place-items: center;
	}

	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
			column-gap: 1rem;
		}
	}
	@media (min-width: 1120px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
`;
export default ProfilePage;
