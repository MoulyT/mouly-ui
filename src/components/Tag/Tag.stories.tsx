import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Tag } from "./index";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "outline",
      ],
      description: "The visual style variant of the tag",
    },
    children: {
      control: "text",
      description: "The content of the tag",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Primary");

    await expect(tag).toBeVisible();
    await expect(tag.tagName).toBe("SPAN");
    await expect(tag).toHaveClass("bg-blue-100");
    await expect(tag).toHaveClass("text-blue-800");
    // Base styles
    await expect(tag).toHaveClass("rounded");
    await expect(tag).toHaveClass("px-2");
    await expect(tag).toHaveClass("text-sm");
    await expect(tag).toHaveClass("font-medium");
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Secondary");

    await expect(tag).toHaveClass("bg-gray-100");
    await expect(tag).toHaveClass("text-gray-800");
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Completed",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Completed");

    await expect(tag).toHaveClass("bg-green-100");
    await expect(tag).toHaveClass("text-green-800");
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Pending",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Pending");

    await expect(tag).toHaveClass("bg-amber-100");
    await expect(tag).toHaveClass("text-amber-800");
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Error");

    await expect(tag).toHaveClass("bg-red-100");
    await expect(tag).toHaveClass("text-red-800");
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Outline");

    await expect(tag).toHaveClass("border");
    await expect(tag).toHaveClass("border-blue-600");
    await expect(tag).toHaveClass("text-blue-600");
    await expect(tag).toHaveClass("bg-transparent");
  },
};

export const WithCustomClass: Story = {
  args: {
    variant: "primary",
    children: "Custom",
    className: "uppercase tracking-wide",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText("Custom");

    // Custom classes merged
    await expect(tag).toHaveClass("uppercase");
    await expect(tag).toHaveClass("tracking-wide");
    // Base classes still applied
    await expect(tag).toHaveClass("bg-blue-100");
  },
};

export const AllVariants: Story = {
  args: {
    children: "Tag",
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="primary">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="danger">Danger</Tag>
      <Tag variant="outline">Outline</Tag>
    </div>
  ),
};
