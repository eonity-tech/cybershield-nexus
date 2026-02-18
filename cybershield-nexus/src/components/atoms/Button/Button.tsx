import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    children?: React.ReactNode;
    variant?: "danger" | "success" | "light" | "slate";
    isRounded?: boolean;
}

const Button = ({
    label,
    children,
    variant = "slate",
    isRounded = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) => {
    
    // Construction dynamique des classes
    const buttonClass = `
        nexus-btn 
        ${variant} 
        ${isRounded ? "rounded" : ""} 
        ${className}
    `.trim();

    return (
        <button 
            className={buttonClass} 
            disabled={disabled}
            {...props}
        >
            {/* Affiche le label OU les enfants (icônes, etc.) */}
            {label || children}
        </button>
    );
};

export default Button;