import type { Meta, StoryObj } from "@storybook/react";
import SecurityOverview from "./SecurityOverview";

const meta: Meta<typeof SecurityOverview> = {
	title: "Organisms/SecurityOverview",
	component: SecurityOverview,
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
					width: "450px",
					margin: "0 auto",
					paddingTop: "2rem",
				}}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SecurityOverview>;

export const Default: Story = {};
