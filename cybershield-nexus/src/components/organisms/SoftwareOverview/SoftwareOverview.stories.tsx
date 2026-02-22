import type { Meta, StoryObj } from "@storybook/react";
import SoftwareOverview from "./SoftwareOverview";

const meta: Meta<typeof SoftwareOverview> = {
	title: "Organisms/SoftwareOverview",
	component: SoftwareOverview,
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
type Story = StoryObj<typeof SoftwareOverview>;

export const Default: Story = {};
