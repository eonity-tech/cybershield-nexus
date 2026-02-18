import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./Tooltip";
import { FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

const meta = {
	title: "Atoms/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	argTypes: {
		position: {
			control: "select",
			options: ["top", "bottom", "left", "right"],
			description: "Position de la bulle par rapport à l'élément",
		},
	},
} satisfies Meta<typeof meta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoTooltip: Story = {
	args: {
		content: "Le trafic est analysé en temps réel par le moteur Nexus.",
		position: "top",
	},
	render: (args) => (
		<div style={{ padding: "100px", textAlign: "center" }}>
			<Tooltip {...args}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						color: "#3b82f6",
					}}>
					<FaInfoCircle />
					<span>Survolez pour plus d'infos</span>
				</div>
			</Tooltip>
		</div>
	),
};

export const CriticalWarning: Story = {
	args: {
		content: "Action irréversible : l'appareil sera isolé du VLAN.",
		position: "bottom",
	},
	render: (args) => (
		<div style={{ padding: "100px", textAlign: "center" }}>
			<Tooltip {...args}>
				<button
					style={{
						padding: "8px 16px",
						background: "#cc3a3a",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}>
					Isoler Machine
				</button>
			</Tooltip>
		</div>
	),
};

export const ClickableTooltip: Story = {
	args: {
		content: "Détails techniques : Ce nœud utilise le protocole TLS 1.3.",
		position: "right",
		showOnClick: true,
	},
	render: (args) => (
		<div style={{ padding: "100px", textAlign: "center" }}>
			<Tooltip {...args}>
				<span
					style={{
						borderBottom: "1px dashed #3b82f6",
						color: "#3b82f6",
						cursor: "pointer",
					}}>
					Cliquez pour les specs
				</span>
			</Tooltip>
		</div>
	),
};
