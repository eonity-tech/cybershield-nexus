import type { Meta, StoryObj } from "@storybook/react";
import List from "./List";

const meta = {
	title: "Atoms/List",
	component: List,
	tags: ["autodocs"],
	argTypes: {
		renderItem: { control: false }, // On désactive le control car c'est une fonction
	},
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- DONNÉES DE TEST ---
const mockDevices = [
	{ id: 1, hostname: "PC-TEST-SOFT", ip: "192.168.1.59" },
	{ id: 2, hostname: "SRV-DATA-CRITICAL", ip: "10.0.0.50" },
	{ id: 3, hostname: "GATEWAY-SERVER", ip: "10.0.0.1" },
];

// --- LES SCÉNARIOS ---

export const DevicesList: Story = {
	args: {
		items: mockDevices,
		renderItem: (item: any) => (
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
				}}>
				<span style={{ fontWeight: "bold" }}>{item.hostname}</span>
				<span style={{ opacity: 0.7 }}>{item.ip}</span>
			</div>
		),
	},
};

export const ThreatsList: Story = {
	args: {
		className: "threat-variant",
		items: [
			"Log4j (v2.14.1) détecté sur SRV-DATA",
			"Tentative de connexion Telnet bloquée",
		],
		renderItem: (item: string) => (
			<div
				style={{
					color: "#ef4444",
					display: "flex",
					alignItems: "center",
					gap: "10px",
				}}>
				<span>⚠️</span>
				<span>{item}</span>
			</div>
		),
	},
};

export const Empty: Story = {
	args: {
		items: [],
		emptyMessage: "Aucun appareil détecté dans ce segment réseau.",
	},
};
