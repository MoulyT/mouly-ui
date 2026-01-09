import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Switch } from "./index";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is on",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled",
    },
    label: {
      control: "text",
      description: "Label text for the switch",
    },
    hideLabel: {
      control: "boolean",
      description: "Visually hide the label",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display below the switch",
    },
    hintText: {
      control: "text",
      description: "Hint text to display below the switch",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledTemplate: Story["render"] = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.currentTarget.checked)}
    />
  );
};

export const Default: Story = {
  args: {
    name: "notifications",
    label: "Enable notifications",
    onChange: fn(),
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchInput = canvas.getByRole("switch");

    await expect(switchInput).toBeInTheDocument();
    await expect(switchInput).not.toBeChecked();

    await userEvent.click(switchInput);
    await expect(switchInput).toBeChecked();

    await userEvent.click(switchInput);
    await expect(switchInput).not.toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    name: "dark-mode",
    label: "Dark mode",
    checked: true,
  },
  render: ControlledTemplate,
};

export const WithHintText: Story = {
  args: {
    name: "auto-save",
    label: "Auto-save",
    hintText: "Automatically save your work every 5 minutes.",
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText(
      "Automatically save your work every 5 minutes.",
    );

    await expect(hint).toBeInTheDocument();
  },
};

export const WithError: Story = {
  args: {
    name: "terms",
    label: "Accept terms",
    errorMessage: "You must accept the terms to continue.",
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchInput = canvas.getByRole("switch");
    const error = canvas.getByText("You must accept the terms to continue.");

    await expect(switchInput).toHaveAttribute("aria-invalid", "true");
    await expect(error).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled-switch",
    label: "This option is not available",
    disabled: true,
  },
  render: ControlledTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchInput = canvas.getByRole("switch");

    await expect(switchInput).toBeDisabled();
  },
};

export const DisabledChecked: Story = {
  args: {
    name: "disabled-checked",
    label: "Pre-enabled option (locked)",
    disabled: true,
    checked: true,
  },
  render: ControlledTemplate,
};

export const WithLongLabel: Story = {
  args: {
    name: "marketing",
    label:
      "I agree to receive marketing communications and promotional offers from the company.",
    hintText: "You can unsubscribe at any time.",
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
    name: "analytics",
    label: (
      <>
        Enable{" "}
        <a
          href="#"
          className="text-blue-600 underline hover:text-blue-800"
          onClick={(e) => e.preventDefault()}
        >
          analytics tracking
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
      <Switch
        name="unchecked"
        label="Unchecked"
        checked={checked1}
        onChange={(e) => setChecked1(e.currentTarget.checked)}
      />
      <Switch
        name="checked"
        label="Checked"
        checked={checked2}
        onChange={(e) => setChecked2(e.currentTarget.checked)}
      />
      <Switch
        name="with-hint"
        label="With hint text"
        hintText="This is additional information"
        checked={false}
        onChange={() => {}}
      />
      <Switch
        name="with-error"
        label="With error"
        errorMessage="This field is required"
        checked={false}
        onChange={() => {}}
      />
      <Switch
        name="disabled"
        label="Disabled"
        disabled
        checked={false}
        onChange={() => {}}
      />
      <Switch
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

function SettingsPanelRender() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest: false,
    darkMode: true,
    autoPlay: false,
    analytics: true,
  });

  const handleChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-80 rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Settings</h3>
      <div className="flex flex-col gap-2">
        <Switch
          name="notifications"
          label="Push notifications"
          hintText="Receive alerts on your device"
          checked={settings.notifications}
          onChange={() => handleChange("notifications")}
        />
        <Switch
          name="email-digest"
          label="Weekly email digest"
          checked={settings.emailDigest}
          onChange={() => handleChange("emailDigest")}
        />
        <Switch
          name="dark-mode"
          label="Dark mode"
          checked={settings.darkMode}
          onChange={() => handleChange("darkMode")}
        />
        <Switch
          name="auto-play"
          label="Auto-play videos"
          checked={settings.autoPlay}
          onChange={() => handleChange("autoPlay")}
        />
        <Switch
          name="analytics"
          label="Usage analytics"
          hintText="Help us improve the product"
          checked={settings.analytics}
          onChange={() => handleChange("analytics")}
        />
      </div>
    </div>
  );
}

export const SettingsPanel: Story = {
  args: {
    name: "settings-panel",
    label: "Example",
  },
  render: () => <SettingsPanelRender />,
  parameters: {
    docs: {
      description: {
        story:
          "Example of multiple switches in a typical settings panel layout.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switches = canvas.getAllByRole("switch");

    // Verify all switches are rendered
    await expect(switches).toHaveLength(5);

    // Toggle the first switch (initially checked)
    const firstSwitch = switches[0] as HTMLInputElement;
    await expect(firstSwitch).toBeChecked();

    await userEvent.click(firstSwitch);
    await expect(firstSwitch).not.toBeChecked();
  },
};
