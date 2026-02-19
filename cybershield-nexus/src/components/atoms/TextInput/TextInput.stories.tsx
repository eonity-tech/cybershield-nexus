import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";
import { useState } from "react";
import { FaSearch, FaEnvelope, FaLock } from "react-icons/fa";

const meta = {
	title: "Atoms/TextInput",
	component: TextInput,
	tags: ["autodocs"],
	argTypes: {
		error: { control: "text" },
	},
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. Variante par défaut ---
export const Default: Story = {
	args: {
		label: "Nom d'utilisateur",
		placeholder: "Ex: admin_nexus",
	},
};

// --- 2. Variante Champ Requis ---
export const RequiredField: Story = {
	args: {
		label: "Email professionnel",
		placeholder: "contact@cybershield.com",
		required: true,
		type: "email",
	},
};

// --- 3. Variante avec Erreur Statique ---
export const RequiredWithError: Story = {
	args: {
		label: "Mot de passe",
		type: "password",
		required: true,
		error: "Le mot de passe doit contenir au moins 8 caractères.",
		placeholder: "••••••••",
	},
};

// --- 4. Variante "Intelligente" (Validation dynamique) ---
export const EmailValidation: Story = {
	render: (args) => {
		const [value, setValue] = useState("");
		const [error, setError] = useState("");

		const validateEmail = (email: string) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!email) {
				setError("L'email est requis.");
			} else if (!emailRegex.test(email)) {
				setError("Format invalide (ex: user@nexus.com)");
			} else {
				setError("");
			}
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
			if (error) setError("");
		};
		
		const iconPrefix = <FaEnvelope />;

		return (
			<TextInput
				{...args}
				value={value}
				onChange={handleChange}
				onBlur={() => validateEmail(value)}
				error={error}
				iconPrefix={iconPrefix}
			/>
		);
	},
	args: {
		label: "Email de récupération",
		placeholder: "Entrez un email valide...",
		required: true,
		type: "email",
	},
};

// --- 5. Variante Validation Mot de Passe (Complexe) ---
export const PasswordValidation: Story = {
    render: (args) => {
        const [value, setValue] = useState("");
        const [error, setError] = useState("");

        const validatePassword = (pwd: string) => {
            if (!pwd) {
                setError("");
                return;
            }
            
            if (pwd.length < 8) {
                setError("Au moins 8 caractères requis.");
            } else if (!/[0-9]/.test(pwd)) {
                setError("Au moins un chiffre requise.");
            } else if (!/[A-Z]/.test(pwd)) {
                setError("Au moins une majuscule requise.");
            } else if (!/[a-z]/.test(pwd)) {
                setError("Au moins une minuscule requise.");
            } else {
                setError(""); // Tout est ok, on efface l'erreur
            }
        };

        // Nettoyage (au Change / pendant la frappe)
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);

            const isValid = 
                newValue.length >= 8 &&      // 8 caractères
                /[0-9]/.test(newValue) &&    // Un chiffre
                /[A-Z]/.test(newValue) &&    // Une majuscule
                /[a-z]/.test(newValue);      // Une minuscule

            if (error && isValid) {
                setError("");
            }
		};
		
		const iconPrefix = <FaLock />;

        return (
            <TextInput
                {...args}
                value={value}
                onChange={handleChange}
                onBlur={() => validatePassword(value)}
				error={error}
				iconPrefix={iconPrefix}
            />
        );
    },
    args: {
        label: "Mot de passe sécurisé",
        type: "password",
        placeholder: "Ex: Nexus2024",
        required: true,
    },
};

// --- 6. Variante avec Icônes ---
export const WithIcons: Story = {
    args: {
        label: "Recherche globale",
        placeholder: "IP, Hostname, CVE...",
        iconPrefix: <FaSearch />,
    },
};

export const EmailWithIcon: Story = {
    args: {
        label: "Contact",
        type: "email",
        placeholder: "admin@nexus.local",
        iconPrefix: <FaEnvelope />,
    },
};
