import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Select } from "@/components/Select";

const testOptions = [
  { value: "es", label: "Spain" },
  { value: "mx", label: "Mexico" },
  { value: "ar", label: "Argentina" },
];

test("Select connects label to select via htmlFor", async () => {
  const screen = await render(
    <Select name="country" label="Country" options={testOptions} />,
  );

  const select = screen.getByRole("combobox");
  const label = screen.getByText("Country");

  const selectId = select.element().getAttribute("id");
  expect(selectId).toBeTruthy();

  await expect.element(label).toHaveAttribute("for", selectId!);
});

test("Select links helper text with aria-describedby when present", async () => {
  const screen = await render(
    <Select
      name="test"
      label="Test"
      options={testOptions}
      hintText="Hint text"
    />,
  );

  const select = screen.getByRole("combobox");
  const selectElement = select.element() as HTMLSelectElement;
  const helperId = selectElement.getAttribute("aria-describedby");

  expect(helperId).toBeTruthy();

  const helperText = screen.container.querySelector(`#${helperId}`);
  expect(helperText).not.toBeNull();
  expect(helperText?.textContent).toBe("Hint text");
});

test("Select sets aria-invalid when error is present", async () => {
  const screen = await render(
    <Select
      name="test"
      label="Test"
      options={testOptions}
      errorMessage="This field is required"
    />,
  );

  const select = screen.getByRole("combobox");
  await expect.element(select).toHaveAttribute("aria-invalid", "true");
});
