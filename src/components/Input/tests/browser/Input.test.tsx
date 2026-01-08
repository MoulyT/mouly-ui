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

test("Input renders with label", async () => {
  const screen = await render(
    <Input name="email" label="Email" placeholder="Enter your email" />,
  );

  const input = screen.getByRole("textbox");
  await expect.element(input).toBeVisible();
  await expect.element(input).toHaveAttribute("name", "email");

  const label = screen.getByText("Email");
  await expect.element(label).toBeVisible();
});

test("Input connects label to input via htmlFor", async () => {
  const screen = await render(<Input name="username" label="Username" />);

  const input = screen.getByRole("textbox");
  const label = screen.getByText("Username");

  const inputId = input.element().getAttribute("id");
  expect(inputId).toBeTruthy();

  await expect.element(label).toHaveAttribute("for", inputId!);
});

test("Input uses custom id when provided", async () => {
  const screen = await render(
    <Input name="email" id="custom-id" label="Email" />,
  );

  const input = screen.getByRole("textbox");
  await expect.element(input).toHaveAttribute("id", "custom-id");
});

test("Input generates unique id with useId when no id provided", async () => {
  await render(
    <div>
      <Input name="field1" label="Field 1" />
      <Input name="field2" label="Field 2" />
    </div>,
  );

  const inputs = document.querySelectorAll("input");
  const id1 = inputs[0].getAttribute("id");
  const id2 = inputs[1].getAttribute("id");

  expect(id1).toBeTruthy();
  expect(id2).toBeTruthy();
  expect(id1).not.toBe(id2);
});

test("Input shows hint text", async () => {
  const screen = await render(
    <Input
      name="password"
      label="Password"
      hintText="Must be at least 8 characters"
    />,
  );

  const hint = screen.getByText("Must be at least 8 characters");
  await expect.element(hint).toBeVisible();
});

test("Input shows error message and applies error styling", async () => {
  const screen = await render(
    <Input name="email" label="Email" errorMessage="Invalid email address" />,
  );

  const input = screen.getByRole("textbox");
  const error = screen.getByText("Invalid email address");

  await expect.element(input).toHaveAttribute("aria-invalid", "true");
  await expect.element(error).toBeVisible();
  await expect.element(error).toHaveClass("text-red-600");
});

test("Input error message takes precedence over hint text", async () => {
  const screen = await render(
    <Input
      name="email"
      label="Email"
      hintText="Enter a valid email"
      errorMessage="This field is required"
    />,
  );

  const error = screen.getByText("This field is required");
  await expect.element(error).toBeVisible();

  await expect
    .poll(() => document.body.textContent?.includes("Enter a valid email"))
    .toBe(false);
});

test("Input hides label visually when hideLabel is true", async () => {
  const screen = await render(<Input name="search" label="Search" hideLabel />);

  const label = screen.getByText("Search");
  await expect.element(label).toHaveClass("sr-only");
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

test("Input toggle button has accessible label", async () => {
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

test("Input is disabled when disabled prop is true", async () => {
  const screen = await render(
    <Input name="disabled" label="Disabled" disabled />,
  );

  const input = screen.getByRole("textbox");
  await expect.element(input).toBeDisabled();
});

test("Input forwards ref correctly", async () => {
  let inputRef: HTMLInputElement | null = null;

  function TestComponent() {
    return (
      <Input
        name="test"
        label="Test"
        ref={(el) => {
          inputRef = el;
        }}
      />
    );
  }

  await render(<TestComponent />);

  await expect.poll(() => inputRef !== null).toBe(true);
  expect(inputRef!.tagName).toBe("INPUT");
});

test("Input connects aria-describedby to helper text with generated id", async () => {
  const screen = await render(
    <Input
      name="email"
      label="Email"
      hintText="We'll never share your email"
    />,
  );

  const input = screen.getByRole("textbox");
  const inputId = input.element().getAttribute("id");
  const expectedHelperId = `${inputId}-helper`;

  await expect
    .element(input)
    .toHaveAttribute("aria-describedby", expectedHelperId);

  const helper = screen.getByText("We'll never share your email");
  await expect.element(helper).toHaveAttribute("id", expectedHelperId);
});

test("restoreCursorPosition does nothing when input is not active element", async () => {
  const input = document.createElement("input");
  input.selectionStart = 0;
  input.selectionEnd = 0;

  restoreCursorPosition(input, { selectionStart: 5, selectionEnd: 10 });

  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(0);
});
