import type { Meta, StoryObj } from "@storybook/react";
import type { ChartData } from "chart.js";
import SwitchDonut from "./SwitchDonut";

const mockTrafficData: ChartData<"doughnut"> = {
	labels: ["Sains", "Élevé", "Critiques"],
	datasets: [
		{
			data: [120, 15, 3],
			backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
			borderWidth: 0,
		},
	],
};

const mockDeviceData: ChartData<"doughnut"> = {
	labels: ["Sains", "Élevé", "Critiques"],
	datasets: [
		{
			data: [45, 30, 25],
			backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
			borderWidth: 0,
		},
	],
};

// --- CONFIGURATION STORYBOOK ---
const meta: Meta<typeof SwitchDonut> = {
	title: "Molecules/SwitchDonut",
	component: SwitchDonut,
	tags: ["autodocs"],
	parameters: {
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#0f172a" }],
		},
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: "450px", margin: "2rem auto" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SwitchDonut>;

export const Default: Story = {
	args: {
		title: "Répartition des Menaces",
		leftLabel: "Trafic",
		rightLabel: "Appareils",
		leftData: mockTrafficData,
		rightData: mockDeviceData,
	},
};

export const EmptyData: Story = {
	args: {
		title: "Répartition des Menaces (Vide)",
		leftLabel: "Trafic",
		rightLabel: "Appareils",
		leftData: {
			labels: ["Aucune donnée"],
			datasets: [
				{ data: [1], backgroundColor: ["#334155"], borderWidth: 0 },
			],
		},
		rightData: {
			labels: ["Aucune donnée"],
			datasets: [
				{ data: [1], backgroundColor: ["#334155"], borderWidth: 0 },
			],
		},
	},
};
