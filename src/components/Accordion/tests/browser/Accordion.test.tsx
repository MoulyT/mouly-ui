import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { useState } from "react";
import { userEvent } from "vitest/browser";
import { Accordion } from "@/components/Accordion";

test("Single mode opens only one item at a time", async () => {
  const screen = await render(
    <Accordion.Root type="single">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger1 = screen.getByRole("button", { name: "Item 1" });
  const trigger2 = screen.getByRole("button", { name: "Item 2" });

  await trigger1.click();
  await expect.element(trigger1).toHaveAttribute("aria-expanded", "true");
  await expect.element(trigger2).toHaveAttribute("aria-expanded", "false");

  await trigger2.click();
  await expect.element(trigger1).toHaveAttribute("aria-expanded", "false");
  await expect.element(trigger2).toHaveAttribute("aria-expanded", "true");
});

test("Single mode with collapsible false prevents closing last item", async () => {
  const screen = await render(
    <Accordion.Root type="single" defaultValue="item-1" collapsible={false}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger = screen.getByRole("button");
  await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
  await expect.element(trigger).toHaveAttribute("aria-disabled", "true");
});

test("Single mode with collapsible true allows closing all items", async () => {
  const screen = await render(
    <Accordion.Root type="single" defaultValue="item-1" collapsible={true}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger = screen.getByRole("button");
  await expect.element(trigger).toHaveAttribute("aria-expanded", "true");

  await trigger.click();
  await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Multiple mode allows opening multiple items simultaneously", async () => {
  const screen = await render(
    <Accordion.Root type="multiple" defaultValue={["item-1", "item-2"]}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>Content 3</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger1 = screen.getByRole("button", { name: "Item 1" });
  const trigger2 = screen.getByRole("button", { name: "Item 2" });
  const trigger3 = screen.getByRole("button", { name: "Item 3" });

  await expect.element(trigger1).toHaveAttribute("aria-expanded", "true");
  await expect.element(trigger2).toHaveAttribute("aria-expanded", "true");
  await expect.element(trigger3).toHaveAttribute("aria-expanded", "false");
});

test("ArrowDown focuses next trigger in circular fashion", async () => {
  const screen = await render(
    <Accordion.Root type="single">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>Content 3</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger1 = screen.getByRole("button", { name: "Item 1" });
  const trigger2 = screen.getByRole("button", { name: "Item 2" });
  const trigger3 = screen.getByRole("button", { name: "Item 3" });

  await userEvent.click(trigger1.element());
  await userEvent.keyboard("{ArrowDown}");
  await expect.poll(() => document.activeElement).toBe(trigger2.element());

  await userEvent.keyboard("{ArrowDown}");
  await expect.poll(() => document.activeElement).toBe(trigger3.element());

  await userEvent.keyboard("{ArrowDown}");
  await expect.poll(() => document.activeElement).toBe(trigger1.element());
});

test("Home key focuses first trigger", async () => {
  const screen = await render(
    <Accordion.Root type="single">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>Content 3</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger1 = screen.getByRole("button", { name: "Item 1" });
  const trigger3 = screen.getByRole("button", { name: "Item 3" });

  await userEvent.click(trigger3.element());
  await userEvent.keyboard("{Home}");
  await expect.poll(() => document.activeElement).toBe(trigger1.element());
});

test("End key focuses last trigger", async () => {
  const screen = await render(
    <Accordion.Root type="single">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Content>Content 3</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger1 = screen.getByRole("button", { name: "Item 1" });
  const trigger3 = screen.getByRole("button", { name: "Item 3" });

  await userEvent.click(trigger1.element());
  await userEvent.keyboard("{End}");
  await expect.poll(() => document.activeElement).toBe(trigger3.element());
});

test("Trigger has correct aria-controls linking to content", async () => {
  const screen = await render(
    <Accordion.Root type="single" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger = screen.getByRole("button");
  const content = screen.getByRole("region");

  const ariaControls = trigger.element().getAttribute("aria-controls");
  const contentId = content.element().getAttribute("id");

  expect(ariaControls).toBe(contentId);
});

test("Content has aria-labelledby linking to trigger", async () => {
  const screen = await render(
    <Accordion.Root type="single" defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger = screen.getByRole("button");
  const content = screen.getByRole("region");

  const triggerId = trigger.element().getAttribute("id");
  const ariaLabelledBy = content.element().getAttribute("aria-labelledby");

  expect(ariaLabelledBy).toBe(triggerId);
});

test("Disabled root disables all items", async () => {
  const screen = await render(
    <Accordion.Root type="single" disabled>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger1 = screen.getByText("Item 1");
  const trigger2 = screen.getByText("Item 2");

  await expect.element(trigger1).toBeDisabled();
  await expect.element(trigger2).toBeDisabled();
});

test("Disabled item cannot be toggled", async () => {
  const screen = await render(
    <Accordion.Root type="single">
      <Accordion.Item value="item-1" disabled>
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger = screen.getByRole("button");
  await expect.element(trigger).toBeDisabled();
  await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Uncontrolled mode manages state internally", async () => {
  const screen = await render(
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>,
  );

  const trigger = screen.getByRole("button");

  await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
  await trigger.click();
  await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Controlled mode calls onValueChange callback", async () => {
  const events: string[] = [];

  function ControlledAccordion() {
    const [value, setValue] = useState("");

    return (
      <Accordion.Root
        type="single"
        value={value}
        onValueChange={(v) => {
          events.push(v);
          setValue(v);
        }}
      >
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    );
  }

  const screen = await render(<ControlledAccordion />);
  const trigger = screen.getByRole("button");

  await trigger.click();
  expect(events).toEqual(["item-1"]);
});
