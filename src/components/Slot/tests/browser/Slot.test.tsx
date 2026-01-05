import { test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";
import { Slot } from "@/components/Slot";
import { Fragment } from "react";

test("Slot renders child element", async () => {
  const screen = await render(
    <Slot>
      <button>Click me</button>
    </Slot>,
  );

  await expect.element(screen.getByRole("button")).toBeVisible();
  await expect
    .element(screen.getByRole("button"))
    .toHaveTextContent("Click me");
});

test("Slot merges className from slot and child", async () => {
  const screen = await render(
    <Slot className="slot-class">
      <button className="child-class">Click</button>
    </Slot>,
  );

  const button = screen.getByRole("button");
  await expect.element(button).toHaveClass("slot-class");
  await expect.element(button).toHaveClass("child-class");
});

test("Slot merges style from slot and child with child winning", async () => {
  const screen = await render(
    <Slot style={{ color: "red", fontSize: "12px" }}>
      <button style={{ color: "blue" }}>Click</button>
    </Slot>,
  );

  const button = screen.getByRole("button");
  await expect.element(button).toHaveStyle({ color: "blue" });
  await expect.element(button).toHaveStyle({ fontSize: "12px" });
});

test("Slot composes onClick handlers", async () => {
  const events: string[] = [];

  function TestComponent() {
    return (
      <Slot onClick={() => events.push("slot")}>
        <button onClick={() => events.push("child")}>Click</button>
      </Slot>
    );
  }

  const screen = await render(<TestComponent />);

  await screen.getByRole("button").click();

  expect(events).toEqual(["child", "slot"]);
});

test("Slot passes through other props to child", async () => {
  const screen = await render(
    <Slot data-testid="test-button" aria-label="Submit">
      <button>Click</button>
    </Slot>,
  );

  const button = screen.getByRole("button");
  await expect.element(button).toHaveAttribute("data-testid", "test-button");
  await expect.element(button).toHaveAttribute("aria-label", "Submit");
});

test("Slot returns null when children is not a valid element", async () => {
  await render(<Slot>Invalid children</Slot>);

  await expect
    .poll(() => {
      const button = document.querySelector("button");
      return button;
    })
    .toBeNull();
});

test("Slot returns null when given array of children", async () => {
  await render(
    <Slot>
      {[<button key="1">First</button>, <button key="2">Second</button>]}
    </Slot>,
  );

  await expect.poll(() => document.querySelectorAll("button").length).toBe(0);
});

test("Slot renders Fragment but props do not affect Fragment children", async () => {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  const screen = await render(
    <Slot className="slot-class" data-custom="slot-value">
      <Fragment>
        <span data-testid="fragment-child">Content</span>
      </Fragment>
    </Slot>,
  );

  const child = screen.getByTestId("fragment-child");
  await expect.element(child).toBeVisible();
  await expect.element(child).not.toHaveClass("slot-class");
  await expect.element(child).not.toHaveAttribute("data-custom");

  expect(consoleErrorSpy).toHaveBeenCalled();
  const errorCall = consoleErrorSpy.mock.calls[0][0];
  expect(errorCall).toMatch(/Invalid prop.*supplied to.*React\.Fragment/);

  consoleErrorSpy.mockRestore();
});
