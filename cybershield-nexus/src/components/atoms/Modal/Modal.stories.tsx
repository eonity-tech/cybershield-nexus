import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import { useState } from "react";
import { FaShieldAlt, FaGlobe, FaClock } from "react-icons/fa";

const meta = {
	title: "Atoms/Modal",
	component: Modal,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		isOpen: {
			control: "boolean",
			description: "Définit si la modal est affichée ou non",
		},
		onClose: {
			description:
				"Fonction appelée lors de la fermeture (overlay ou bouton X)",
		},
		title: {
			control: "text",
			description: "Titre affiché dans le header de la modal",
		},
		size: {
			control: "select",
			options: ["small", "medium", "large"],
			description: "Largeur prédéfinie de la modal",
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isOpen: true,
		title: "Détails du Serveur CRITICAL",
		size: "medium",
	},
	render: (args) => {
		const [isOpen, setIsOpen] = useState(args.isOpen);

		return (
			<div>
				<button
					onClick={() => setIsOpen(true)}
					style={{
						padding: "10px 20px",
						cursor: "pointer",
						background: "#3b82f6",
						color: "white",
						border: "none",
						borderRadius: "4px",
					}}>
					Simuler une alerte
				</button>

				<Modal
					{...args}
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					footer={
						<>
							<button
								style={{
									padding: "8px 16px",
									borderRadius: "4px",
									cursor: "pointer",
									background: "transparent",
									color: "white",
									border: "1px solid #475569",
								}}
								onClick={() => setIsOpen(false)}>
								Annuler
							</button>
							<button
								style={{
									padding: "8px 16px",
									background: "#cc3a3a",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}>
								Isoler la machine
							</button>
						</>
					}>
					<p style={{ marginBottom: "15px" }}>
						Tentative d'intrusion détectée sur{" "}
						<strong>SRV-DATA-01</strong>.
					</p>
					<ul
						style={{
							listStyle: "none",
							padding: 0,
							display: "flex",
							flexDirection: "column",
							gap: "10px",
						}}>
						<li
							style={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
							}}>
							<FaShieldAlt style={{ color: "#3b82f6" }} />
							<span>
								<strong>Protocole:</strong> SSH (Port 22)
							</span>
						</li>
						<li
							style={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
							}}>
							<FaGlobe style={{ color: "#22c55e" }} />
							<span>
								<strong>Origine:</strong> 185.244.x.x
							</span>
						</li>
						<li
							style={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
							}}>
							<FaClock style={{ color: "#f59e0b" }} />
							<span>
								<strong>Date:</strong> 19 Février 2026
							</span>
						</li>
					</ul>
				</Modal>
			</div>
		);
	},
};

export const Small: Story = {
	args: {
		isOpen: true,
		title: "Confirmation",
		size: "small",
	},
	render: (args) => {
		const [isOpen, setIsOpen] = useState(args.isOpen);

		return (
			<div>
				<button
					onClick={() => setIsOpen(true)}
					style={{
						padding: "10px 20px",
						cursor: "pointer",
						borderRadius: "4px",
					}}>
					Tester la fermeture
				</button>

				<Modal
					{...args}
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					footer={
						<button
							onClick={() => setIsOpen(false)}
							style={{
								padding: "8px 16px",
								background: "#3b82f6",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
							}}>
							Compris
						</button>
					}>
					<p>Êtes-vous sûr de vouloir déconnecter cet appareil ?</p>
				</Modal>
			</div>
		);
	},
};
