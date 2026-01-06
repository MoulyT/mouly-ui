import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Button } from "@/components/Button";

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="plus-icon" {...props}>
    <path d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="trash-icon" {...props}>
    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9" />
  </svg>
);

test("Button renders child element when asChild is true", async () => {
  const screen = await render(
    <Button asChild>
      <a href="/home">Home</a>
    </Button>,
  );

  const link = screen.getByRole("link");
  await expect.element(link).toBeVisible();
  await expect.element(link).toHaveTextContent("Home");
  await expect.element(link).toHaveAttribute("href", "/home");

  await expect.poll(() => document.querySelector("button")).toBeNull();
});

test("Button merges className to child when asChild is true", async () => {
  const screen = await render(
    <Button asChild className="custom-btn">
      <span className="child-class">Text</span>
    </Button>,
  );

  const span = screen.getByText("Text");
  await expect.element(span).toHaveClass("custom-btn");
  await expect.element(span).toHaveClass("child-class");
});

test("Button with asChild composes event handlers", async () => {
  const events: string[] = [];

  function TestComponent() {
    return (
      <Button asChild onClick={() => events.push("button")}>
        <button onClick={() => events.push("child")}>Click</button>
      </Button>
    );
  }

  const screen = await render(<TestComponent />);
  await screen.getByRole("button").click();

  expect(events).toEqual(["child", "button"]);
});

test("Button renders icon with child when asChild is true", async () => {
  const screen = await render(
    <Button asChild icon={PlusIcon}>
      <a href="/add">Add Item</a>
    </Button>,
  );

  const link = screen.getByRole("link");
  await expect.element(link).toBeVisible();

  const icon = screen.getByTestId("plus-icon");
  await expect.element(icon).toBeVisible();
});

test("Button applies aria-hidden true to icon", async () => {
  const screen = await render(<Button icon={PlusIcon}>Add</Button>);

  const icon = screen.getByTestId("plus-icon");
  await expect.element(icon).toHaveAttribute("aria-hidden", "true");
});

test("Button applies sr-only class when hideText is true", async () => {
  const screen = await render(<Button hideText>Hidden Text</Button>);

  const button = screen.getByRole("button");
  await expect.element(button).toBeVisible();

  await expect
    .poll(() => {
      const span = button.element().querySelector("span.sr-only");
      return span !== null;
    })
    .toBe(true);
});

test("Button text is accessible to screen readers when hideText is true", async () => {
  const screen = await render(
    <Button hideText icon={TrashIcon}>
      Delete
    </Button>,
  );

  const button = screen.getByRole("button");
  await expect.element(button).toHaveAccessibleName("Delete");
});

test("Button renders icon on left when iconPosition is left", async () => {
  const screen = await render(
    <Button icon={PlusIcon} iconPosition="left">
      Add
    </Button>,
  );

  const button = screen.getByRole("button");
  const children = Array.from(button.element().children);

  expect(children[0].getAttribute("data-testid")).toBe("plus-icon");
  expect(children[1].tagName).toBe("SPAN");
});

test("Button renders icon on right by default", async () => {
  const screen = await render(<Button icon={PlusIcon}>Add</Button>);

  const button = screen.getByRole("button");
  const children = Array.from(button.element().children);

  expect(children[0].tagName).toBe("SPAN");
  expect(children[1].getAttribute("data-testid")).toBe("plus-icon");
});

test("Button wraps children in span with text-center class", async () => {
  const screen = await render(<Button>Click me</Button>);

  const button = screen.getByRole("button");

  await expect
    .poll(() => {
      const span = button.element().querySelector("span.text-center");
      return span !== null && span.textContent === "Click me";
    })
    .toBe(true);
});
