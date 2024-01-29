/* eslint-disable react/prop-types */
const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{/* to avoid camel case text value */}
				{labelText || name}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				className="form-input"
				onChange={onChange}
				defaultValue={defaultValue || ''}
				required
			/>
		</div>
	);
};
export default FormRow;
