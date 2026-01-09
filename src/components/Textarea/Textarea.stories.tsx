import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Textarea } from "./index";

const meta = {
  title: "Components/Form/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    name: {
      control: "text",
      description: "Name attribute for form submission",
    },
    label: {
      control: "text",
      description: "Label text for the textarea",
    },
    hideLabel: {
      control: "boolean",
      description:
        "Visually hide the label (still accessible to screen readers)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the textarea",
    },
    error: {
      control: "boolean",
      description: "Mark the textarea as having an error",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
    hintText: {
      control: "text",
      description: "Hint text to display",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    rows: {
      control: "number",
      description: "Number of visible text rows",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "description",
    label: "Description",
    placeholder: "Enter your description...",
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByLabelText("Description");

    await expect(textarea).toBeInTheDocument();
    await userEvent.type(textarea, "Test message");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const WithHintText: Story = {
  args: {
    name: "bio",
    label: "Bio",
    hintText: "Tell us a bit about yourself (max 500 characters)",
    placeholder: "Write your bio...",
    maxLength: 500,
  },
};

export const WithError: Story = {
  args: {
    name: "feedback",
    label: "Feedback",
    errorMessage: "This field is required",
    placeholder: "Your feedback...",
    defaultValue: "",
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled-textarea",
    label: "Disabled Textarea",
    disabled: true,
    defaultValue: "This textarea is disabled",
  },
};

export const WithHiddenLabel: Story = {
  args: {
    name: "hidden-label",
    label: "Comment",
    hideLabel: true,
    placeholder: "Add your comment...",
  },
};

export const CustomRows: Story = {
  args: {
    name: "notes",
    label: "Notes",
    rows: 10,
    placeholder: "Enter your notes...",
  },
};

export const Required: Story = {
  args: {
    name: "message",
    label: "Message",
    required: true,
    placeholder: "This field is required...",
    hintText: "Required field",
  },
};

export const AllStates: Story = {
  args: {
    name: "all-states",
    label: "All States",
  },
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <Textarea name="default" label="Default" placeholder="Default state..." />
      <Textarea
        name="with-hint"
        label="With Hint"
        hintText="This is a hint text"
        placeholder="With hint..."
      />
      <Textarea
        name="with-error"
        label="With Error"
        errorMessage="This field has an error"
        placeholder="With error..."
      />
      <Textarea
        name="disabled"
        label="Disabled"
        disabled
        defaultValue="Disabled state"
      />
    </div>
  ),
};
