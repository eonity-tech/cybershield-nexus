import type { Meta, StoryObj } from "@storybook/react";
import StatusBadge from "./StatusBadge"; // Ici, il importe bien le fichier .tsx au-dessus

const meta = {
	title: "Atoms/StatusBadge",
	component: StatusBadge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		status: {
			control: "select",
			options: [
				"Actif",
				"Inactif",
				"Critique",
				"Linux",
				"Windows",
				"macOS",
			],
		},
		label: { control: "text" },
	},
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Actif: Story = { args: { status: "Actif" } };
export const Danger: Story = {
	args: { status: "Critique", label: "ALERTE INTRUSION" },
};
