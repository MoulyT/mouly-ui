import { test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Checkbox } from "@/components/Checkbox";

test("Checkbox shows check icon when checked", async () => {
  const screen = await render(
    <Checkbox name="test" label="Test" checked={true} onChange={() => {}} />,
  );

  const checkIcon = screen.getByTestId("check-icon");

  // Verify the icon is rendered and has display !== 'none'
  await expect
    .poll(() => {
      const element = checkIcon.element();
      const computedStyle = window.getComputedStyle(element);
      return computedStyle.display !== "none";
    })
    .toBe(true);
});

test("Checkbox hides check icon when unchecked", async () => {
  const screen = await render(
    <Checkbox name="test" label="Test" checked={false} onChange={() => {}} />,
  );

  const checkIcon = screen.getByTestId("check-icon");

  // Verify the icon has display: none when unchecked
  await expect
    .poll(() => {
      const element = checkIcon.element();
      const computedStyle = window.getComputedStyle(element);
      return computedStyle.display === "none";
    })
    .toBe(true);
});

test("Checkbox prioritizes error message over hint text", async () => {
  const screen = await render(
    <Checkbox
      name="test"
      label="Test"
      checked={false}
      onChange={() => {}}
      errorMessage="Error message"
      hintText="Hint text"
    />,
  );

  const error = screen.getByText("Error message");
  await expect.element(error).toBeVisible();

  await expect
    .poll(() => document.body.textContent?.includes("Hint text"))
    .toBe(false);
});

test("Checkbox aria-describedby points to helper when present", async () => {
  const screen = await render(
    <Checkbox
      name="test"
      label="Test"
      id="my-checkbox"
      checked={false}
      onChange={() => {}}
      hintText="Helper text"
    />,
  );

  const checkbox = screen.getByRole("checkbox");
  await expect
    .element(checkbox)
    .toHaveAttribute("aria-describedby", "my-checkbox-helper");
});

test("Checkbox does not have aria-describedby when no helper", async () => {
  const screen = await render(
    <Checkbox name="test" label="Test" checked={false} onChange={() => {}} />,
  );

  const checkbox = screen.getByRole("checkbox");

  await expect
    .poll(() => checkbox.element().hasAttribute("aria-describedby"))
    .toBe(false);
});

test("Checkbox supports custom className", async () => {
  await render(
    <Checkbox
      name="test"
      label="Test"
      checked={false}
      onChange={() => {}}
      className="custom-class"
    />,
  );

  await expect
    .poll(() => document.querySelector(".custom-class") !== null)
    .toBe(true);
});

test("Checkbox supports ReactNode as label", async () => {
  const { getByText } = await render(
    <Checkbox
      name="test"
      label={
        <span>
          Accept <strong>terms</strong>
        </span>
      }
      checked={false}
      onChange={() => {}}
    />,
  );

  const terms = getByText("terms");
  await expect.element(terms).toBeVisible();
});

test("Checkbox calls onChange when label is clicked", async () => {
  const onChange = vi.fn();

  const screen = await render(
    <Checkbox name="test" label="Test" checked={false} onChange={onChange} />,
  );

  // Click on the label since the input is sr-only (visually hidden)
  const label = screen.getByText("Test");
  await label.click();
  expect(onChange).toHaveBeenCalledTimes(1);
});
