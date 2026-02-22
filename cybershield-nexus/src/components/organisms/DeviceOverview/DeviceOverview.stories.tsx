import type { Meta, StoryObj } from "@storybook/react";
import DeviceOverview from "./DeviceOverview";

const meta: Meta<typeof DeviceOverview> = {
	title: "Organisms/DeviceOverview",
	component: DeviceOverview,
	tags: ["autodocs"],
	parameters: {
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#0f172a" }],
		},
	},
	decorators: [
		(Story) => (
			<div
				style={{
					width: "100%",
					maxWidth: "600px",
					padding: "2rem",
					margin: "0 auto",
				}}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DeviceOverview>;

export const Default: Story = {};
