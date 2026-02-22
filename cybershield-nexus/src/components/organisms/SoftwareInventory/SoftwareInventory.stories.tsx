import type { Meta, StoryObj } from "@storybook/react";
import SoftwareInventory from "./SoftwareInventory";

const meta: Meta<typeof SoftwareInventory> = {
	title: "Organisms/SoftwareInventory",
	component: SoftwareInventory,
	tags: ["autodocs"],
	parameters: {
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#0f172a" }],
		},
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "2rem", minHeight: "80vh" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SoftwareInventory>;

export const Default: Story = {};
