import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";

const AddJobPage = () => {
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div>
			<Form method='post' className='form'>
				<h4 className='form-title'>add job</h4>
				<div className='form-center'>
					<FormRow type='text' name='position' />
					<FormRow type='text' name='company' />
					<FormRow
						type='text'
						labelText='job location'
						name='jobLocation'
						defaultValue={user.location}
					/>
					<button
						type='submit'
						className='btn btn-block form-btn'
						disabled={isSubmitting}
					>
						{isSubmitting ? "submitting..." : "submit"}
					</button>
				</div>
			</Form>
		</div>
	);
};
export default AddJobPage;
