import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "./index";

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

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
    />
  </svg>
);

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "The type of the input",
    },
    hideLabel: {
      control: "boolean",
      description: "Visually hide the label while keeping it accessible",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute("name", "email");

    const label = canvas.getByText("Email");
    await expect(label).toBeInTheDocument();
  },
};

export const WithHintText: Story = {
  args: {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    hintText: "This will be your public display name.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText("This will be your public display name.");

    await expect(hint).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    defaultValue: "invalid-email",
    errorMessage: "Please enter a valid email address.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const error = canvas.getByText("Please enter a valid email address.");

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(error).toBeInTheDocument();
  },
};

export const Password: Story = {
  args: {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter your password");
    const toggleButton = canvas.getByRole("button", { name: /password/i });

    await expect(input).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);
    await expect(input).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    await expect(input).toHaveAttribute("type", "password");
  },
};

export const WithIcon: Story = {
  args: {
    name: "search",
    label: "Search",
    placeholder: "Search...",
    icon: SearchIcon,
  },
};

export const WithCalendarIcon: Story = {
  args: {
    name: "date",
    label: "Date",
    placeholder: "Select a date",
    icon: CalendarIcon,
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled-input",
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toBeDisabled();
  },
};

export const HiddenLabel: Story = {
  args: {
    name: "search",
    label: "Search",
    placeholder: "Search...",
    hideLabel: true,
    icon: SearchIcon,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    const label = canvas.getByText("Search");

    await expect(input).toBeInTheDocument();
    await expect(label).toHaveClass("sr-only");
  },
};

export const AllStates: Story = {
  args: {
    name: "all-states",
    label: "All States",
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Input name="default" label="Default" placeholder="Default input" />
      <Input
        name="with-hint"
        label="With Hint"
        placeholder="Enter value"
        hintText="This is a helpful hint"
      />
      <Input
        name="with-error"
        label="With Error"
        placeholder="Enter value"
        errorMessage="This field is required"
      />
      <Input
        name="with-icon"
        label="With Icon"
        placeholder="Search..."
        icon={SearchIcon}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Enter password"
      />
      <Input
        name="disabled"
        label="Disabled"
        placeholder="Disabled input"
        disabled
      />
    </div>
  ),
};
