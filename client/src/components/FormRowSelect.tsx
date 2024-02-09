interface IFormRowSelectProps {
	name?: string;
	labelText?: string;
	list: string[];
	defaultValue?: string;
	onChange?: () => void;
}

const FormRowSelect = ({
	name,
	labelText,
	list,
	defaultValue = '',
	onChange,
}: IFormRowSelectProps) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<select
				name={name}
				id={name}
				className="form-select"
				defaultValue={defaultValue}
				onChange={onChange}
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
