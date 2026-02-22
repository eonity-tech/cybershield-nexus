import type { Meta, StoryObj } from "@storybook/react";
import NetworkAnalyze from "./NetworkAnalyze";

const meta: Meta<typeof NetworkAnalyze> = {
	title: "Organisms/NetworkAnalyze",
	component: NetworkAnalyze,
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
type Story = StoryObj<typeof NetworkAnalyze>;

export const Default: Story = {};
