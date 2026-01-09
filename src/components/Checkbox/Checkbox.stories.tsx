import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Checkbox } from "./index";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the checkbox is in an indeterminate state",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    label: {
      control: "text",
      description: "Label text for the checkbox",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display below the checkbox",
    },
    hintText: {
      control: "text",
      description: "Hint text to display below the checkbox",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledTemplate: Story["render"] = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.currentTarget.checked)}
    />
  );
};

export const Default: Story = {
  args: {
    name: "terms",
    label: "Accept terms and conditions",
    onChange: fn(),
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    name: "newsletter",
    label: "Subscribe to newsletter",
    checked: true,
  },
  render: ControlledTemplate,
};

export const WithHintText: Story = {
  args: {
    name: "updates",
    label: "Receive product updates",
    hintText: "We'll send you occasional emails about new features.",
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText(
      "We'll send you occasional emails about new features.",
    );

    await expect(hint).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    name: "agreement",
    label: "I agree to the terms",
    errorMessage: "You must accept the terms to continue.",
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    const error = canvas.getByText("You must accept the terms to continue.");

    await expect(checkbox).toHaveAttribute("aria-invalid", "true");
    await expect(error).toBeInTheDocument();
  },
};

export const Indeterminate: Story = {
  args: {
    name: "select-all",
    label: "Select all items",
    indeterminate: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox") as HTMLInputElement;

    await expect(checkbox.indeterminate).toBe(true);
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled-checkbox",
    label: "This option is not available",
    disabled: true,
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");

    await expect(checkbox).toBeDisabled();
  },
};

export const DisabledChecked: Story = {
  args: {
    name: "disabled-checked",
    label: "Pre-selected option (locked)",
    disabled: true,
    checked: true,
  },
  render: ControlledTemplate,
};

export const WithLongLabel: Story = {
  args: {
    name: "privacy",
    label:
      "I have read and agree to the Privacy Policy and understand that my data will be processed in accordance with the applicable regulations.",
    hintText: "You can withdraw your consent at any time.",
  },
  render: ControlledTemplate,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const WithRichLabel: Story = {
  args: {
    name: "terms-link",
    label: (
      <>
        I agree to the{" "}
        <a
          href="#"
          className="text-blue-600 underline hover:text-blue-800"
          onClick={(e) => e.preventDefault()}
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-blue-600 underline hover:text-blue-800"
          onClick={(e) => e.preventDefault()}
        >
          Privacy Policy
        </a>
      </>
    ),
  },
  render: ControlledTemplate,
};

function AllStatesRender() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        name="unchecked"
        label="Unchecked"
        checked={checked1}
        onChange={(e) => setChecked1(e.currentTarget.checked)}
      />
      <Checkbox
        name="checked"
        label="Checked"
        checked={checked2}
        onChange={(e) => setChecked2(e.currentTarget.checked)}
      />
      <Checkbox
        name="indeterminate"
        label="Indeterminate"
        indeterminate
        checked={false}
        onChange={() => {}}
      />
      <Checkbox
        name="with-hint"
        label="With hint text"
        hintText="This is additional information"
        checked={false}
        onChange={() => {}}
      />
      <Checkbox
        name="with-error"
        label="With error"
        errorMessage="This field is required"
        checked={false}
        onChange={() => {}}
      />
      <Checkbox
        name="disabled"
        label="Disabled"
        disabled
        checked={false}
        onChange={() => {}}
      />
      <Checkbox
        name="disabled-checked"
        label="Disabled checked"
        disabled
        checked
        onChange={() => {}}
      />
    </div>
  );
}

export const AllStates: Story = {
  args: {
    name: "all-states",
    label: "Example",
  },
  render: () => <AllStatesRender />,
};

/**
 * Demonstrates the indeterminate state in a real "Select All" scenario.
 * The parent checkbox shows:
 * - Unchecked when no items are selected
 * - Checked when all items are selected
 * - Indeterminate when some (but not all) items are selected
 */
function SelectAllExample() {
  const [items, setItems] = useState([
    { id: "read", label: "Read", checked: true },
    { id: "write", label: "Write", checked: true },
    { id: "delete", label: "Delete", checked: false },
  ]);

  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked);
  const isIndeterminate = someChecked && !allChecked;

  const handleSelectAll = () => {
    // If some or none are checked, check all. If all are checked, uncheck all.
    const newValue = !allChecked;
    setItems(items.map((item) => ({ ...item, checked: newValue })));
  };

  const handleItemChange = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        name="select-all"
        label={<span className="font-semibold">All permissions</span>}
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={handleSelectAll}
      />
      <div className="ml-6 flex flex-col gap-1">
        {items.map((item) => (
          <Checkbox
            key={item.id}
            name={item.id}
            label={item.label}
            checked={item.checked}
            onChange={() => handleItemChange(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export const SelectAllPattern: Story = {
  args: {
    name: "select-all-pattern",
    label: "Example",
  },
  render: () => <SelectAllExample />,
  parameters: {
    docs: {
      description: {
        story:
          "The indeterminate state is used when a parent checkbox controls multiple child checkboxes. It indicates that some, but not all, children are selected.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially: Read and Write are checked, Delete is not
    // So the parent should be indeterminate
    const parentCheckbox = canvas.getAllByRole(
      "checkbox",
    )[0] as HTMLInputElement;
    await expect(parentCheckbox.indeterminate).toBe(true);

    // Click Delete to check it
    const deleteCheckbox = canvas.getByLabelText("Delete");
    await userEvent.click(deleteCheckbox);

    // Now all are checked, parent should not be indeterminate
    await expect(parentCheckbox.indeterminate).toBe(false);
    await expect(parentCheckbox).toBeChecked();

    // Click parent to uncheck all
    await userEvent.click(parentCheckbox);
    await expect(parentCheckbox).not.toBeChecked();

    // All children should be unchecked
    const readCheckbox = canvas.getByLabelText("Read");
    const writeCheckbox = canvas.getByLabelText("Write");
    await expect(readCheckbox).not.toBeChecked();
    await expect(writeCheckbox).not.toBeChecked();
    await expect(deleteCheckbox).not.toBeChecked();
  },
};
