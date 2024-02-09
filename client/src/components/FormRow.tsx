interface IFormRowProps {
	type?: string;
	name?: string;
	labelText?: string;
	defaultValue?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow = ({
	type,
	name,
	labelText,
	defaultValue,
	onChange,
}: IFormRowProps) => {
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
