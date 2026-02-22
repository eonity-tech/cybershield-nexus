import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../../services/auth/AuthContext";

const meta = {
	title: "Organisms/Sidebar",
	component: Sidebar,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<BrowserRouter>
				<AuthContext.Provider
					value={
						{
							username: "Analyste_Nexus_01",
							logout: () => alert("Déconnexion cliquée !"),
							isAuthenticated: true,
						} as any
					}>
					<div
						style={{
							width: "260px",
							height: "100vh",
							backgroundColor: "#0f172a",
						}}>
						<Story />
					</div>
				</AuthContext.Provider>
			</BrowserRouter>
		),
	],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
