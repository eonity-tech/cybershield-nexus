import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Switch from "./Switch";
import type { SwitchProps } from "./Switch";

const meta: Meta<typeof Switch> = {
	title: "Atoms/Switch",
	component: Switch,
	tags: ["autodocs"],
	parameters: {
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#111827" }],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Switch>;

const SwitchWithState = (args: SwitchProps) => {
	const [checked, setChecked] = useState(args.checked);
	return <Switch {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
	render: (args) => <SwitchWithState {...args} />,
	args: {
		checked: false,
	},
};

export const Checked: Story = {
	render: (args) => <SwitchWithState {...args} />,
	args: {
		checked: true,
	},
};

export const WithLabels: Story = {
	render: (args) => <SwitchWithState {...args} />,
	args: {
		checked: false,
		leftLabel: "Trafic",
		rightLabel: "Appareils",
	},
};

export const Disabled: Story = {
	render: (args) => <SwitchWithState {...args} />,
	args: {
		checked: false,
		disabled: true,
		leftLabel: "Désactivé",
	},
};
