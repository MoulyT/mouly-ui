import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import { Tabs } from "@/components/Tabs";

test("First tab is active by default if no defaultValue", async () => {
  const screen = await render(
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const content1 = screen.getByRole("tabpanel");

  await expect.element(trigger1).toHaveAttribute("aria-selected", "true");
  await expect.element(content1).toBeVisible();
  await expect.element(content1).toHaveTextContent("Content 1");
});

test("Clicking a trigger switches active tab", async () => {
  const screen = await render(
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger2 = screen.getByRole("tab", { name: "Tab 2" });
  await userEvent.click(trigger2.element());

  const content2 = screen.getByRole("tabpanel");

  await expect.element(trigger2).toHaveAttribute("aria-selected", "true");
  await expect.element(content2).toBeVisible();
  await expect.element(content2).toHaveTextContent("Content 2");
});

test("ArrowRight focuses and activates next trigger (horizontal)", async () => {
  const screen = await render(
    <Tabs.Root orientation="horizontal">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const trigger2 = screen.getByRole("tab", { name: "Tab 2" });

  await userEvent.click(trigger1.element());
  await userEvent.keyboard("{ArrowRight}");

  await expect.poll(() => document.activeElement).toBe(trigger2.element());
  await expect.element(trigger2).toHaveAttribute("aria-selected", "true");
});

test("ArrowDown focuses and activates next trigger (vertical)", async () => {
  const screen = await render(
    <Tabs.Root orientation="vertical">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const trigger2 = screen.getByRole("tab", { name: "Tab 2" });

  await userEvent.click(trigger1.element());
  await userEvent.keyboard("{ArrowDown}");

  await expect.poll(() => document.activeElement).toBe(trigger2.element());
  await expect.element(trigger2).toHaveAttribute("aria-selected", "true");
});

test("Home key focuses first trigger", async () => {
  const screen = await render(
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const trigger3 = screen.getByRole("tab", { name: "Tab 3" });

  await userEvent.click(trigger3.element());
  await userEvent.keyboard("{Home}");

  await expect.poll(() => document.activeElement).toBe(trigger1.element());
  await expect.element(trigger1).toHaveAttribute("aria-selected", "true");
});

test("End key focuses last trigger", async () => {
  const screen = await render(
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
      <Tabs.Content value="tab3">Content 3</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const trigger3 = screen.getByRole("tab", { name: "Tab 3" });

  await userEvent.click(trigger1.element());
  await userEvent.keyboard("{End}");

  await expect.poll(() => document.activeElement).toBe(trigger3.element());
  await expect.element(trigger3).toHaveAttribute("aria-selected", "true");
});

test("ARIA attributes link trigger and content correctly", async () => {
  const screen = await render(
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger = screen.getByRole("tab", { name: "Tab 1" });
  const content = screen.getByRole("tabpanel");

  const triggerId = trigger.element().getAttribute("id");
  const contentId = content.element().getAttribute("id");
  const ariaControls = trigger.element().getAttribute("aria-controls");
  const ariaLabelledBy = content.element().getAttribute("aria-labelledby");

  expect(ariaControls).toBe(contentId);
  expect(ariaLabelledBy).toBe(triggerId);
});

test("Disabled root disables all triggers", async () => {
  const screen = await render(
    <Tabs.Root disabled>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const trigger2 = screen.getByRole("tab", { name: "Tab 2" });

  await expect.element(trigger1).toBeDisabled();
  await expect.element(trigger2).toBeDisabled();
});

test("Only active trigger has tabIndex 0", async () => {
  const screen = await render(
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const trigger2 = screen.getByRole("tab", { name: "Tab 2" });

  await expect.element(trigger1).toHaveAttribute("tabIndex", "0");
  await expect.element(trigger2).toHaveAttribute("tabIndex", "-1");

  await userEvent.click(trigger2.element());

  await expect.element(trigger1).toHaveAttribute("tabIndex", "-1");
  await expect.element(trigger2).toHaveAttribute("tabIndex", "0");
});

test("ArrowRight wraps from last to first trigger", async () => {
  const screen = await render(
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Root>,
  );

  const trigger1 = screen.getByRole("tab", { name: "Tab 1" });
  const trigger2 = screen.getByRole("tab", { name: "Tab 2" });

  await userEvent.click(trigger2.element());
  await userEvent.keyboard("{ArrowRight}");

  await expect.poll(() => document.activeElement).toBe(trigger1.element());
  await expect.element(trigger1).toHaveAttribute("aria-selected", "true");
});
