import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Icon } from "./index";

// Sample icons for stories
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    component: SearchIcon,
  },
  argTypes: {
    component: {
      control: false,
      description: "The SVG component to render",
    },
    size: {
      control: "select",
      options: ["xs", "s", "m", "l", "xl"],
      description: "The size of the icon",
    },
    ariaHidden: {
      control: "boolean",
      description: "Whether the icon is hidden from assistive technologies",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    component: SearchIcon,
    size: "m",
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");

    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute("aria-hidden", "true");
  },
};

export const ExtraSmall: Story = {
  args: {
    component: SearchIcon,
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    component: SearchIcon,
    size: "s",
  },
};

export const Medium: Story = {
  args: {
    component: SearchIcon,
    size: "m",
  },
};

export const Large: Story = {
  args: {
    component: SearchIcon,
    size: "l",
  },
};

export const ExtraLarge: Story = {
  args: {
    component: SearchIcon,
    size: "xl",
  },
};

export const WithCustomColor: Story = {
  args: {
    component: HeartIcon,
    size: "l",
    className: "text-red-500",
  },
  play: async ({ canvasElement }) => {
    const iconWrapper = canvasElement.querySelector("div");

    await expect(iconWrapper).toHaveClass("text-red-500");
  },
};

export const AccessibleIcon: Story = {
  args: {
    component: StarIcon,
    size: "m",
    ariaHidden: false,
  },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");

    await expect(svg).toHaveAttribute("aria-hidden", "false");
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon component={SearchIcon} size="xs" />
        <span className="text-xs text-gray-500">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon component={SearchIcon} size="s" />
        <span className="text-xs text-gray-500">s</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon component={SearchIcon} size="m" />
        <span className="text-xs text-gray-500">m</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon component={SearchIcon} size="l" />
        <span className="text-xs text-gray-500">l</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon component={SearchIcon} size="xl" />
        <span className="text-xs text-gray-500">xl</span>
      </div>
    </div>
  ),
};

export const DifferentIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon component={SearchIcon} size="l" className="text-blue-600" />
      <Icon component={HeartIcon} size="l" className="text-red-500" />
      <Icon component={StarIcon} size="l" className="text-yellow-500" />
    </div>
  ),
};
