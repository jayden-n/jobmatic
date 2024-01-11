import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants.js";
const AddJobPage = () => {
	const { user } = useOutletContext();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	return (
		<div>
			<Form method='post' className='form'>
				<h4 className='form-title'>add job</h4>
				<div className='form-center'>
					{/* INPUTS */}
					<FormRow type='text' name='position' />
					<FormRow type='text' name='company' />
					<FormRow
						type='text'
						labelText='job location'
						name='jobLocation'
						defaultValue={user.location}
					/>

					{/* SELECTION */}
					<FormRowSelect
						labelText='job status'
						name='jobStatus'
						defaultValue={JOB_STATUS.INTERVIEW}
						list={Object.values(JOB_STATUS)}
					/>
					<FormRowSelect
						labelText='job type'
						name='jobType'
						defaultValue={JOB_TYPE.FULL_TIME}
						list={Object.values(JOB_TYPE)}
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
