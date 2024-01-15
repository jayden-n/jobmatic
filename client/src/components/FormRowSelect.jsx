/* eslint-disable react/prop-types */
const FormRowSelect = ({ name, labelText, list, defaultValue = "" }) => {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<select
				name={name}
				id={name}
				className='form-select'
				defaultValue={defaultValue}
			>
				{list.map((itemValue, i) => {
					return (
						<option key={i} value={itemValue}>
							{itemValue}
						</option>
					);
				})}
			</select>
		</div>
	);
};
export default FormRowSelect;
