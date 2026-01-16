import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Tabs } from "./index";
import type { TabsRootProps } from "./types";

const meta = {
  title: "Components/Tabs",
  component: Tabs.Root,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout direction of tabs",
    },
    disabled: {
      control: "boolean",
      description: "Disable all tabs",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<TabsRootProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalBasic: Story = {
  args: {
    orientation: "horizontal",
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1" className="p-4">
        Content for Tab 1. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit.
      </Tabs.Content>
      <Tabs.Content value="tab2" className="p-4">
        Content for Tab 2. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Tabs.Content>
      <Tabs.Content value="tab3" className="p-4">
        Content for Tab 3. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco.
      </Tabs.Content>
    </Tabs.Root>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("tab");

    await expect(triggers[0]).toHaveAttribute("aria-selected", "true");
    await expect(triggers[1]).toHaveAttribute("aria-selected", "false");
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    defaultValue: "account",
  },
  render: (args) => (
    <Tabs.Root {...args}>
      <div className="flex gap-4">
        <Tabs.List className="flex-col border-r pr-4">
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="password">Password</Tabs.Trigger>
          <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        </Tabs.List>
        <div className="flex-1">
          <Tabs.Content value="account" className="p-4">
            <h3 className="mb-2 font-semibold">Account Settings</h3>
            <p>Manage your account settings and preferences here.</p>
          </Tabs.Content>
          <Tabs.Content value="password" className="p-4">
            <h3 className="mb-2 font-semibold">Password Settings</h3>
            <p>Change your password and security settings.</p>
          </Tabs.Content>
          <Tabs.Content value="billing" className="p-4">
            <h3 className="mb-2 font-semibold">Billing Settings</h3>
            <p>View and manage your billing information.</p>
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  ),
};

export const Controlled: Story = {
  args: {},
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState("tab2");

      return (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setValue("tab1")}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Go to Tab 1
            </button>
            <button
              onClick={() => setValue("tab2")}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Go to Tab 2
            </button>
            <button
              onClick={() => setValue("tab3")}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Go to Tab 3
            </button>
          </div>
          <Tabs.Root value={value} onValueChange={setValue}>
            <Tabs.List>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1" className="p-4">
              Content for Tab 1
            </Tabs.Content>
            <Tabs.Content value="tab2" className="p-4">
              Content for Tab 2
            </Tabs.Content>
            <Tabs.Content value="tab3" className="p-4">
              Content for Tab 3
            </Tabs.Content>
          </Tabs.Root>
        </div>
      );
    }
    return <ControlledExample />;
  },
};

export const WithIcons: Story = {
  args: {},
  render: () => (
    <Tabs.Root defaultValue="home">
      <Tabs.List>
        <Tabs.Trigger value="home">
          <svg
            className="mr-2 inline-block h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </Tabs.Trigger>
        <Tabs.Trigger value="settings">
          <svg
            className="mr-2 inline-block h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </Tabs.Trigger>
        <Tabs.Trigger value="profile">
          <svg
            className="mr-2 inline-block h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Profile
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="home" className="p-4">
        Welcome to your home dashboard!
      </Tabs.Content>
      <Tabs.Content value="settings" className="p-4">
        Configure your application settings here.
      </Tabs.Content>
      <Tabs.Content value="profile" className="p-4">
        View and edit your profile information.
      </Tabs.Content>
    </Tabs.Root>
  ),
};

export const DisabledItems: Story = {
  args: {},
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Enabled Tab</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>
          Disabled Tab
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3">Enabled Tab</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1" className="p-4">
        Content for enabled tab 1
      </Tabs.Content>
      <Tabs.Content value="tab2" className="p-4">
        This content should not be accessible
      </Tabs.Content>
      <Tabs.Content value="tab3" className="p-4">
        Content for enabled tab 3
      </Tabs.Content>
    </Tabs.Root>
  ),
};

export const KeyboardNavigation: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="rounded bg-blue-50 p-3 text-sm">
        <strong>Keyboard shortcuts:</strong>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            <kbd className="rounded bg-white px-1">←/→</kbd> - Navigate tabs
            (horizontal)
          </li>
          <li>
            <kbd className="rounded bg-white px-1">↑/↓</kbd> - Navigate tabs
            (vertical)
          </li>
          <li>
            <kbd className="rounded bg-white px-1">Home</kbd> - First tab
          </li>
          <li>
            <kbd className="rounded bg-white px-1">End</kbd> - Last tab
          </li>
        </ul>
      </div>
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1" className="p-4">
          Content 1
        </Tabs.Content>
        <Tabs.Content value="tab2" className="p-4">
          Content 2
        </Tabs.Content>
        <Tabs.Content value="tab3" className="p-4">
          Content 3
        </Tabs.Content>
      </Tabs.Root>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("tab");

    await triggers[0].focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(triggers[1]).toHaveFocus();

    await userEvent.keyboard("{Home}");
    await expect(triggers[0]).toHaveFocus();

    await userEvent.keyboard("{End}");
    await expect(triggers[2]).toHaveFocus();
  },
};
