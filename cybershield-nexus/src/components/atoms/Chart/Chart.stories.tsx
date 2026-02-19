import type { Meta, StoryObj } from "@storybook/react";
import Chart from "./Chart";

const meta = {
	title: "Atoms/Chart",
	component: Chart,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["line", "bar", "doughnut", "pie"],
			description: "Le type de graphique à afficher",
		},
	},
	parameters: {
		backgrounds: {
			default: "nexus-dark",
			values: [{ name: "nexus-dark", value: "#0f172a" }],
		},
	},
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 1. Graphique Bande Passante (Line) ---
export const NetworkTraffic: Story = {
	args: {
		type: "line",
		height: "350px",
		data: {
			labels: [
				"08:00",
				"08:15",
				"08:30",
				"08:45",
				"09:00",
				"09:15",
				"09:30",
			],
			datasets: [
				{
					label: "Trafic Entrant (MB/s)",
					data: [120, 150, 110, 800, 130, 145, 125],
					borderColor: "#3b82f6", // Bleu Nexus
					backgroundColor: "rgba(59, 130, 246, 0.2)",
					borderWidth: 2,
					fill: true,
					tension: 0.4,
				},
			],
		},
	},
};

// --- 2. Graphique Répartition des Menaces (Doughnut) ---
export const ThreatDistribution: Story = {
	args: {
		type: "doughnut",
		height: "300px",
		data: {
			labels: ["Sain", "Alerte Mineure", "Critique"],
			datasets: [
				{
					data: [85, 10, 5],
					backgroundColor: [
						"rgba(34, 197, 94, 0.8)",
						"rgba(245, 158, 11, 0.8)",
						"rgba(239, 68, 68, 0.8)",
					],
					borderColor: "#0f172a",
					borderWidth: 2,
					hoverOffset: 4,
				},
			],
		},
	},
};

// --- 3. Graphique Top 5 Ports (Bar) ---
export const TopTargetedPorts: Story = {
	args: {
		type: "bar",
		height: "300px",
		data: {
			labels: [
				"Port 22 (SSH)",
				"Port 80 (HTTP)",
				"Port 443 (HTTPS)",
				"Port 3389 (RDP)",
				"Port 21 (FTP)",
			],
			datasets: [
				{
					label: "Tentatives d'intrusion",
					data: [1245, 843, 532, 211, 84],
					backgroundColor: "#734dce",
					borderRadius: 4,
				},
			],
		},
	},
};
