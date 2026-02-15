import type { Meta, StoryObj } from "@storybook/react";
import StatCard from "./StatCard";
import { FaShieldAlt } from "react-icons/fa";

const meta = {
	title: "Molecules/StatCard",
	component: StatCard,
	tags: ["autodocs"],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {
	args: {
		label: "Alertes Critiques",
		value: "12",
		icon: <FaShieldAlt />,
		iconColor: "red",
		status: "Critique",
	},
};

export const Success: Story = {
	args: {
		label: "Système",
		value: "Opérationnel",
		icon: <FaShieldAlt />,
		iconColor: "green",
		status: "Actif",
	},
};
