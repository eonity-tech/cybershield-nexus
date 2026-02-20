import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ligne de texte simple
export const Text: Story = {
  args: {
    variant: "text",
    width: "80%",
  },
};

// Avatar (Rond)
export const Avatar: Story = {
  args: {
    variant: "circular",
    width: 50,
    height: 50,
  },
};

// Image ou bloc (Rectangle)
export const Thumbnail: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 120,
  },
};

// Exemple concret : Une "Card" complète en chargement
export const CardLoadingExample: Story = {
  render: () => (
    <div style={{ 
      border: "1px solid #333", 
      padding: "20px", 
      borderRadius: "8px", 
      width: "20vw",
      background: "#1a1a1a"
    }}>
      {/* Header avec Avatar et Nom */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
        <Skeleton variant="circular" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={15} />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>

      {/* Corps de la carte */}
      <Skeleton variant="rectangular" width="100%" height="25vh" style={{ marginBottom: "10px" }} />
      
      {/* Description */}
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
    </div>
  ),
};