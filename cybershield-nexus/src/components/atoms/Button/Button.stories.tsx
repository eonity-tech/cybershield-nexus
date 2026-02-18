import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const contentOptions = {
	Simple: "Connexion",

	WithIcon: (
		<span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<span>🛡️</span>
			<span>Scan Système</span>
		</span>
	),

	Loading: (
		<span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<span
				className="spinner"
				style={{
					width: "12px",
					height: "12px",
					border: "2px solid rgba(255,255,255,0.3)",
					borderTop: "2px solid currentColor",
					borderRadius: "50%",
					animation: "spin 1s linear infinite",
				}}
			/>
			<span>Analyse en cours...</span>
			<style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
		</span>
	),

	WithBadge: (
		<span
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "10px",
				width: "100%",
			}}>
			<span>Alertes</span>
			<span
				style={{
					background: "#ef4444",
					color: "white",
					fontSize: "0.7em",
					padding: "2px 6px",
					borderRadius: "10px",
					fontWeight: "bold",
				}}>
				3
			</span>
		</span>
	),
};

const meta = {
	title: "Atoms/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["slate", "danger", "success", "light"],
			description: "Style visuel",
		},
		isRounded: {
			control: "boolean",
			description: "Bords arrondis",
		},
		disabled: {
			control: "boolean",
		},
		label: {
			control: "text",
		},
		onClick: { action: "clicked" },
		children: {
			control: { type: "select" },
			options: Object.keys(contentOptions),
			mapping: contentOptions,
			description: "Contenu riche (Mapping)",
		},
	},
	args: {
		variant: "slate",
		isRounded: false,
		disabled: false,
		children: "Simple",
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Slate: Story = {
	args: {
		variant: "slate",
		label: "Connexion Dashboard",
		children: undefined,
	},
};

export const Danger: Story = {
	args: {
		variant: "danger",
		label: "Arrêt d'Urgence",
		children: undefined,
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		label: "Système Sécurisé",
		children: undefined,
	},
};

export const Light: Story = {
	args: {
		variant: "light",
		label: "Annuler",
		children: undefined,
	},
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const Rounded: Story = {
	args: {
		variant: "slate",
		isRounded: true,
		label: "Scan Rapide",
		children: undefined,
	},
};

export const Disabled: Story = {
	args: {
		variant: "slate",
		disabled: true,
		children: "Loading",
		label: undefined,
	},
};

export const WithIcon: Story = {
	args: {
		variant: "success",
		isRounded: true,
		children: "WithIcon",
		label: undefined,
	},
};

export const WithBadgeExample: Story = {
	args: {
		variant: "slate",
		children: "WithBadge",
		label: undefined,
	},
};
