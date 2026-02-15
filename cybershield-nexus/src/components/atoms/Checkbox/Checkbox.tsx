import "./Checkbox.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
	return (
		<label className="nexus-checkbox-container">
			<input type="checkbox" {...props} />
			<span className="checkmark"></span>
			<span className="label-text">{label}</span>
		</label>
	);
};

export default Checkbox;
