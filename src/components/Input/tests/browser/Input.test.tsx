import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Input } from "@/components/Input";
import { restoreCursorPosition } from "@/components/Input/logic";

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="search-icon" {...props}>
    <path d="M21 21l-5.197-5.197" />
  </svg>
);

const CustomEyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="custom-eye-icon" {...props}>
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CustomEyeSlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="custom-eye-slash-icon" {...props}>
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);

test("Input connects label to input via htmlFor", async () => {
  const screen = await render(<Input name="username" label="Username" />);

  const input = screen.getByRole("textbox");
  const label = screen.getByText("Username");

  const inputId = input.element().getAttribute("id");
  expect(inputId).toBeTruthy();

  await expect.element(label).toHaveAttribute("for", inputId!);
});

test("Input displays icon", async () => {
  const screen = await render(
    <Input name="search" label="Search" icon={SearchIcon} />,
  );

  const icon = screen.getByTestId("search-icon");
  await expect.element(icon).toBeVisible();
});

test("Input toggles password visibility", async () => {
  const screen = await render(
    <Input name="password" label="Password" type="password" />,
  );

  const toggleButton = screen.getByRole("button");

  await expect
    .poll(() =>
      document.querySelector('input[name="password"]')?.getAttribute("type"),
    )
    .toBe("password");

  await toggleButton.click();
  await expect
    .poll(() =>
      document.querySelector('input[name="password"]')?.getAttribute("type"),
    )
    .toBe("text");

  await toggleButton.click();
  await expect
    .poll(() =>
      document.querySelector('input[name="password"]')?.getAttribute("type"),
    )
    .toBe("password");
});

test("Input toggle button updates accessible label", async () => {
  const screen = await render(
    <Input name="password" label="Password" type="password" />,
  );

  const toggleButton = screen.getByRole("button");
  await expect
    .element(toggleButton)
    .toHaveAttribute("aria-label", "Show password");

  await toggleButton.click();
  await expect
    .element(toggleButton)
    .toHaveAttribute("aria-label", "Hide password");
});

test("Input uses custom password icons when provided", async () => {
  const screen = await render(
    <Input
      name="password"
      label="Password"
      type="password"
      passwordVisibleIcon={CustomEyeIcon}
      passwordHiddenIcon={CustomEyeSlashIcon}
    />,
  );

  const hiddenIcon = screen.getByTestId("custom-eye-slash-icon");
  await expect.element(hiddenIcon).toBeVisible();

  const toggleButton = screen.getByRole("button");
  await toggleButton.click();

  const visibleIcon = screen.getByTestId("custom-eye-icon");
  await expect.element(visibleIcon).toBeVisible();
});

test("restoreCursorPosition does nothing when input is not active element", async () => {
  const input = document.createElement("input");
  input.selectionStart = 0;
  input.selectionEnd = 0;

  restoreCursorPosition(input, { selectionStart: 5, selectionEnd: 10 });

  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(0);
});
