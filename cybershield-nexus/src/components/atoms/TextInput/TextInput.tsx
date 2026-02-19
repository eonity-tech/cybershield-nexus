import { useState } from "react";
import "./TextInput.scss";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	iconPrefix?: React.ReactNode;
	iconSuffix?: React.ReactNode;
}

const TextInput = ({
	label,
	error,
	required,
	type,
	iconPrefix,
	iconSuffix,
	...props
}: TextInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const isPassword = type === "password";
	const inputType = isPassword ? (showPassword ? "text" : "password") : type;

	return (
		<div className="nexus-input-group">
			{label && (
				<label className="nexus-label">
					{label}
					{required && <span className="required-mark">*</span>}
				</label>
			)}

			<div className="input-wrapper">
				{iconPrefix && (
					<span className="icon-prefix">{iconPrefix}</span>
				)}

				<input
					className={`nexus-input ${error ? "error" : ""} ${isPassword ? "has-icon" : ""} ${iconPrefix ? "has-prefix" : ""} ${iconSuffix && !isPassword ? "has-suffix" : ""}`}
					required={required}
					type={inputType}
					{...props}
				/>

				{isPassword && (
					<button
						type="button"
						className="toggle-password-btn"
						onClick={() => setShowPassword(!showPassword)}
						aria-label={
							showPassword
								? "Masquer le mot de passe"
								: "Afficher le mot de passe"
						}>
						{showPassword ? (
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22" />
								<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
							</svg>
						) : (
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
								<circle cx="12" cy="12" r="3" />
							</svg>
						)}
					</button>
				)}

				{iconSuffix && !isPassword && (
					<span className="icon-suffix">{iconSuffix}</span>
				)}
			</div>

			{error && <span className="error-message">{error}</span>}
		</div>
	);
};

export default TextInput;
