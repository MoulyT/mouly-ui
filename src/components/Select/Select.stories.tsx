import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, within } from "storybook/test";
import { Select } from "./index";

const meta = {
  title: "Components/Form/Select",
  component: Select,
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
      description: "Label text for the select",
    },
    hideLabel: {
      control: "boolean",
      description:
        "Visually hide the label (still accessible to screen readers)",
    },
    disabled: {
      control: "boolean",
      description: "Disable the select",
    },
    error: {
      control: "boolean",
      description: "Mark the select as having an error",
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
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countriesOptions = [
  { value: "es", label: "Spain" },
  { value: "mx", label: "Mexico" },
  { value: "ar", label: "Argentina" },
  { value: "co", label: "Colombia" },
];

export const Default: Story = {
  args: {
    name: "country",
    label: "Country",
    options: countriesOptions,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText("Country");

    await expect(select).toBeInTheDocument();
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const WithPlaceholder: Story = {
  args: {
    name: "country",
    label: "Country",
    placeholder: "Select a country",
    options: countriesOptions,
  },
};

export const WithHintText: Story = {
  args: {
    name: "country",
    label: "Country",
    hintText: "Choose your country of residence",
    options: countriesOptions,
  },
};

export const WithError: Story = {
  args: {
    name: "country",
    label: "Country",
    errorMessage: "This field is required",
    options: countriesOptions,
  },
};

export const Disabled: Story = {
  args: {
    name: "country",
    label: "Country",
    disabled: true,
    options: countriesOptions,
  },
};

export const WithHiddenLabel: Story = {
  args: {
    name: "country",
    label: "Country",
    hideLabel: true,
    placeholder: "Select a country",
    options: countriesOptions,
  },
};

export const Required: Story = {
  args: {
    name: "country",
    label: "Country",
    required: true,
    placeholder: "Select a country",
    options: countriesOptions,
    hintText: "Required field",
  },
};

const Avatar = ({ src, name }: { src: string; name: string }) => (
  <div className="flex items-center gap-2">
    <img src={src} alt={name} className="size-6 rounded-full object-cover" />
    <span>{name}</span>
  </div>
);

export const WithRichContent: Story = {
  args: {
    name: "assignee",
    label: "Assign to",
    placeholder: "Select a team member",
    options: [
      {
        value: "1",
        label: "John Doe",
        content: (
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John Doe" />
        ),
      },
      {
        value: "2",
        label: "Jane Smith",
        content: (
          <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane Smith" />
        ),
      },
      {
        value: "3",
        label: "Mike Johnson",
        content: (
          <Avatar src="https://i.pravatar.cc/150?img=3" name="Mike Johnson" />
        ),
      },
      {
        value: "4",
        label: "Sarah Williams",
        content: (
          <Avatar src="https://i.pravatar.cc/150?img=4" name="Sarah Williams" />
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates rich content in options (avatars, images). Requires Chrome 135+ with `appearance: base-select`. Falls back to plain text in unsupported browsers.",
      },
    },
  },
};

const Badge = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
    <span>{label}</span>
  </div>
);

export const WithCustomIcons: Story = {
  args: {
    name: "priority",
    label: "Priority",
    placeholder: "Select priority",
    options: [
      {
        value: "critical",
        label: "Critical",
        content: <Badge color="#dc2626" label="Critical" />,
      },
      {
        value: "high",
        label: "High",
        content: <Badge color="#ea580c" label="High" />,
      },
      {
        value: "medium",
        label: "Medium",
        content: <Badge color="#ca8a04" label="Medium" />,
      },
      {
        value: "low",
        label: "Low",
        content: <Badge color="#65a30d" label="Low" />,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom badges with colors. Uses `appearance: base-select` for styling.",
      },
    },
  },
};

export const AllStates: Story = {
  args: {
    name: "all-states",
    label: "All States",
    options: countriesOptions,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Select
        name="default"
        label="Default"
        options={countriesOptions}
        placeholder="Select a country"
      />
      <Select
        name="with-hint"
        label="With Hint"
        options={countriesOptions}
        hintText="This is a helpful hint"
      />
      <Select
        name="with-error"
        label="With Error"
        options={countriesOptions}
        errorMessage="This field is required"
      />
      <Select
        name="disabled"
        label="Disabled"
        options={countriesOptions}
        disabled
      />
    </div>
  ),
};

export const ChromeModernStyling: Story = {
  args: {
    name: "modern",
    label: "Modern Select (Chrome 135+)",
    placeholder: "See the custom styling",
    options: countriesOptions,
    hintText:
      "Open in Chrome 135+ to see appearance: base-select styling with custom dropdown, icons, and checkmarks",
  },
  parameters: {
    docs: {
      description: {
        story: `
### Modern Select Styling with \`appearance: base-select\`

This component uses CSS \`appearance: base-select\` (Chrome 135+) for advanced customization:

**Customized elements:**
- Dropdown picker (\`::picker(select)\`) - styled with shadow, border, padding
- Arrow icon (\`::picker-icon\`) - custom color and size
- Options (\`option\`) - hover states, checked states
- Checkmark (\`::checkmark\`) - custom color for selected option

**Browser support:**
- ✅ Chrome 135+, Edge 135+: Full custom styling
- ✅ Safari, Firefox, older Chrome: Functional native select (progressive enhancement)

**When copying to another project:**
1. Props API stays the same
2. Update \`styles.ts\` arrays to match your design system:
   - \`pickerDropdownStyles\` - dropdown appearance
   - \`pickerIconStyles\` - arrow icon
   - \`optionStyles\` - option items
   - \`checkmarkStyles\` - selected indicator
        `,
      },
    },
  },
};
