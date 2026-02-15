import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta = {
	title: "Atoms/Select",
	component: Select,
	tags: ["autodocs"],
	argTypes: {
		onChange: { action: "changed" },
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelectChips: Story = {
	args: {
		label: "Membres de l'équipe (Chips)",
		placeholder: "Ajouter un membre...",
		isMulti: true,
		options: [
			{ value: "van", label: "Van Henry" },
			{ value: "ralph", label: "Ralph Hubbard" },
			{ value: "omar", label: "Omar Alexander" },
			{ value: "carlos", label: "Carlos Abbott" },
			{ value: "miriam", label: "Miriam Wagner" },
			{ value: "bradley", label: "Bradley Wilkerson" },
		],
	},
};

// Variante Simple classique
export const SingleSelect: Story = {
	args: {
		label: "Niveau de sécurité",
		isMulti: false,
		options: [
			{ value: "low", label: "Faible" },
			{ value: "medium", label: "Moyen" },
			{ value: "high", label: "Élevé" },
			{ value: "critical", label: "Critique" },
		],
	},
};
