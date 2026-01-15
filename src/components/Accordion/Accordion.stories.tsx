import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useState } from "react";
import { Accordion, type AccordionRootProps } from "./index";

const meta = {
  title: "Components/Accordion",
  component: Accordion.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Accordion mode: single or multiple items can be open",
    },
    collapsible: {
      control: "boolean",
      description: "Allow closing all items (only for single mode)",
    },
    disabled: {
      control: "boolean",
      description: "Disable all accordion items",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<AccordionRootProps>;

export default meta;
type Story = StoryObj<AccordionRootProps>;

export const SingleBasic: Story = {
  args: {
    type: "single",
    defaultValue: "item-1",
  },
  render: (args: AccordionRootProps) => (
    <Accordion.Root {...args}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          <Accordion.Icon />
          What is React?
        </Accordion.Trigger>
        <Accordion.Content>
          React is a JavaScript library for building user interfaces,
          particularly single-page applications where you need a fast,
          interactive user experience.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          <Accordion.Icon />
          What is TypeScript?
        </Accordion.Trigger>
        <Accordion.Content>
          TypeScript is a strongly typed programming language that builds on
          JavaScript, giving you better tooling at any scale.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>
          <Accordion.Icon />
          What is Tailwind CSS?
        </Accordion.Trigger>
        <Accordion.Content>
          Tailwind CSS is a utility-first CSS framework that provides low-level
          utility classes to build custom designs.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");

    await expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
    await expect(triggers[1]).toHaveAttribute("aria-expanded", "false");
  },
};

export const SingleCollapsible: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args: AccordionRootProps) => (
    <Accordion.Root {...args}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          <Accordion.Icon />
          Can I close all items?
        </Accordion.Trigger>
        <Accordion.Content>
          Yes! With collapsible=true, you can close all items by clicking the
          open one.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          <Accordion.Icon />
          Is this the default?
        </Accordion.Trigger>
        <Accordion.Content>
          No, by default single mode keeps one item open at all times.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState("item-2");

      return (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setValue("item-1")}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
            >
              Open Item 1
            </button>
            <button
              onClick={() => setValue("item-2")}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
            >
              Open Item 2
            </button>
            <button
              onClick={() => setValue("")}
              className="rounded bg-gray-600 px-3 py-1 text-sm text-white"
            >
              Close All
            </button>
          </div>
          <Accordion.Root
            type="single"
            value={value}
            onValueChange={setValue}
            collapsible
          >
            <Accordion.Item value="item-1">
              <Accordion.Trigger>
                <Accordion.Icon />
                Item 1 (Controlled)
              </Accordion.Trigger>
              <Accordion.Content>
                This accordion is controlled externally by buttons above.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
              <Accordion.Trigger>
                <Accordion.Icon />
                Item 2 (Controlled)
              </Accordion.Trigger>
              <Accordion.Content>
                The state is managed by parent component.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
      );
    }

    return <ControlledExample />;
  },
};

export const MultipleBasic: Story = {
  args: {
    type: "multiple",
    defaultValue: ["item-1", "item-3"],
  },
  render: (args: AccordionRootProps) => (
    <Accordion.Root {...args}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          <Accordion.Icon />
          First Feature
        </Accordion.Trigger>
        <Accordion.Content>
          Multiple items can be open at the same time.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>
          <Accordion.Icon />
          Second Feature
        </Accordion.Trigger>
        <Accordion.Content>
          Each item can be toggled independently.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>
          <Accordion.Icon />
          Third Feature
        </Accordion.Trigger>
        <Accordion.Content>
          All items can be closed or all can be open.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");

    await expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
    await expect(triggers[1]).toHaveAttribute("aria-expanded", "false");
    await expect(triggers[2]).toHaveAttribute("aria-expanded", "true");
  },
};

export const DisabledItem: Story = {
  args: {
    type: "single",
  },
  render: (args: AccordionRootProps) => (
    <Accordion.Root {...args}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>
          <Accordion.Icon />
          Regular item
        </Accordion.Trigger>
        <Accordion.Content>This item can be toggled.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2" disabled>
        <Accordion.Trigger>
          <Accordion.Icon />
          Disabled item
        </Accordion.Trigger>
        <Accordion.Content>This content cannot be accessed.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>
          <Accordion.Icon />
          Another regular item
        </Accordion.Trigger>
        <Accordion.Content>This one works fine.</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};

export const KeyboardNavigation: Story = {
  args: {
    type: "single",
  },
  render: (args: AccordionRootProps) => (
    <div className="flex flex-col gap-4">
      <div className="rounded bg-blue-50 p-3 text-sm">
        <strong>Keyboard shortcuts:</strong>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            <kbd className="rounded bg-white px-1.5 py-0.5">Tab</kbd> - Focus
            next trigger
          </li>
          <li>
            <kbd className="rounded bg-white px-1.5 py-0.5">↓</kbd> - Next
            trigger (circular)
          </li>
          <li>
            <kbd className="rounded bg-white px-1.5 py-0.5">↑</kbd> - Previous
            trigger (circular)
          </li>
          <li>
            <kbd className="rounded bg-white px-1.5 py-0.5">Home</kbd> - First
            trigger
          </li>
          <li>
            <kbd className="rounded bg-white px-1.5 py-0.5">End</kbd> - Last
            trigger
          </li>
          <li>
            <kbd className="rounded bg-white px-1.5 py-0.5">Enter/Space</kbd> -
            Toggle item
          </li>
        </ul>
      </div>
      <Accordion.Root {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <Accordion.Icon />
            First Item
          </Accordion.Trigger>
          <Accordion.Content>Try keyboard navigation!</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <Accordion.Icon />
            Second Item
          </Accordion.Trigger>
          <Accordion.Content>Use arrow keys to navigate.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>
            <Accordion.Icon />
            Third Item
          </Accordion.Trigger>
          <Accordion.Content>Navigation is circular!</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole("button");

    await triggers[0].focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(triggers[1]).toHaveFocus();

    await userEvent.keyboard("{Home}");
    await expect(triggers[0]).toHaveFocus();

    await userEvent.keyboard("{End}");
    await expect(triggers[2]).toHaveFocus();
  },
};
