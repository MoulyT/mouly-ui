import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slot } from "./index";
import type { ComponentPropsWithoutRef } from "react";

const meta = {
  title: "Components/Slot",
  component: Slot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slot>;

export default meta;
type Story = StoryObj<typeof meta>;

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

function Button({ asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  const styles = {
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
  };

  return <Component style={styles} {...props} />;
}

export const AsChildPattern: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
      <Button>Regular Button</Button>
      <Button asChild>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          Renders as Link
        </a>
      </Button>
    </div>
  ),
};
