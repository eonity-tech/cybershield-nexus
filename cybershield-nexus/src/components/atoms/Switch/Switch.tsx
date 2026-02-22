import React from "react";
import "./Switch.scss";

export interface SwitchProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
	leftLabel?: string;
	rightLabel?: string;
	className?: string;
}

const Switch: React.FC<SwitchProps> = ({
	checked,
	onChange,
	disabled = false,
	leftLabel,
	rightLabel,
	className = "",
}) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (!disabled) {
				onChange(!checked);
			}
		}
	};

	return (
		<div
			className={`atom-switch-container ${className} ${disabled ? "disabled" : ""}`}>
			{leftLabel && (
				<span
					className={`switch-label left ${!checked ? "active" : ""}`}>
					{leftLabel}
				</span>
			)}

			<label
				className="switch-wrapper"
				tabIndex={disabled ? -1 : 0}
				onKeyDown={handleKeyDown}
				role="switch"
				aria-checked={checked}>
				<input
					type="checkbox"
					className="switch-input"
					checked={checked}
					onChange={(e) => onChange(e.target.checked)}
					disabled={disabled}
					tabIndex={-1}
				/>
				<span className="switch-slider"></span>
			</label>

			{rightLabel && (
				<span
					className={`switch-label right ${checked ? "active" : ""}`}>
					{rightLabel}
				</span>
			)}
		</div>
	);
};

export default Switch;
