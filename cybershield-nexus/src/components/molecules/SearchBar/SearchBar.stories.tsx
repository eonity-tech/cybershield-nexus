import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
	title: "Molecules/SearchBar",
	component: SearchBar,
	tags: ["autodocs"],
	parameters: {
		backgrounds: {
			default: "dark",
			values: [{ name: "dark", value: "#0f172a" }],
		},
	},
	decorators: [
		(Story) => (
			<div style={{ maxWidth: "400px", padding: "2rem" }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const SearchBarWithState = (args: React.ComponentProps<typeof SearchBar>) => {
	const [searchValue, setSearchValue] = useState(args.value || "");

	return (
		<SearchBar {...args} value={searchValue} onChange={setSearchValue} />
	);
};

export const Default: Story = {
	render: (args) => <SearchBarWithState {...args} />,
	args: {
		value: "",
		placeholder: "Rechercher (IP, Host, Statut)...",
	},
};

export const WithText: Story = {
	render: (args) => <SearchBarWithState {...args} />,
	args: {
		value: "192.168.1.150",
	},
};

export const CustomPlaceholder: Story = {
	render: (args) => <SearchBarWithState {...args} />,
	args: {
		value: "",
		placeholder: "Chercher un profil IA...",
	},
};
