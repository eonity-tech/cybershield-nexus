import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./TextArea";

const meta = {
  title: "Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MarkdownPreview: Story = {
  args: {
    label: "Description de la faille (Markdown)",
    placeholder: "Décrivez la vulnérabilité...",
    rich: true,    // Active la toolbar
    preview: true, // Active l'onglet aperçu
    rows: 6,
  },
};