import type { Meta, StoryObj } from "@storybook/react";
import DeviceInventory from "./DeviceInventory";

const meta: Meta<typeof DeviceInventory> = {
	title: "Organisms/DeviceInventory",
	component: DeviceInventory,
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
type Story = StoryObj<typeof DeviceInventory>;

export const Default: Story = {};
