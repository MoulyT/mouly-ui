import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Checkbox } from "@/components/Checkbox";

test("Checkbox sets indeterminate property on input element", async () => {
  const screen = await render(
    <Checkbox
      name="test"
      label="Test"
      checked={false}
      indeterminate={true}
      onChange={() => {}}
    />,
  );

  const checkbox = screen.getByRole("checkbox");

  await expect
    .poll(() => (checkbox.element() as HTMLInputElement).indeterminate)
    .toBe(true);
});
