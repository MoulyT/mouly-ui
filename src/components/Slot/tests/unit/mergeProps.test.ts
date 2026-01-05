import { test, expect } from "vitest";
import { mergeProps } from "@/components/Slot/logic";
import type { Handler } from "@/components/Slot/types";

test("mergeProps combines event handlers from slot and child", () => {
  const executionOrder: string[] = [];
  const slotProps = {
    onClick: () => executionOrder.push("slot"),
  };
  const childProps = {
    onClick: () => executionOrder.push("child"),
  };

  const merged = mergeProps(slotProps, childProps);
  (merged.onClick as Handler)();

  expect(executionOrder).toEqual(["child", "slot"]);
});

test("mergeProps uses child event handler when slot has none", () => {
  let called = false;
  const slotProps = {};
  const childProps = {
    onClick: () => {
      called = true;
    },
  };

  const merged = mergeProps(slotProps, childProps);
  (merged.onClick as Handler)();

  expect(called).toBe(true);
});

test("mergeProps uses slot event handler when child has none", () => {
  let called = false;
  const slotProps = {
    onClick: () => {
      called = true;
    },
  };
  const childProps = {};

  const merged = mergeProps(slotProps, childProps);
  (merged.onClick as Handler)();

  expect(called).toBe(true);
});

test("mergeProps concatenates className from slot and child", () => {
  const slotProps = { className: "btn" };
  const childProps = { className: "link" };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.className).toBe("btn link");
});

test("mergeProps uses child className when slot has none", () => {
  const slotProps = {};
  const childProps = { className: "link" };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.className).toBe("link");
});

test("mergeProps uses slot className when child has none", () => {
  const slotProps = { className: "btn" };
  const childProps = {};

  const merged = mergeProps(slotProps, childProps);

  expect(merged.className).toBe("btn");
});

test("mergeProps filters out undefined/null values in className", () => {
  const slotProps = { className: undefined };
  const childProps = { className: "link" };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.className).toBe("link");
});

test("mergeProps merges style objects with child winning conflicts", () => {
  const slotProps = {
    style: { color: "red", fontSize: "12px" },
  };
  const childProps = {
    style: { color: "blue", fontWeight: "bold" },
  };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.style).toEqual({
    color: "blue",
    fontSize: "12px",
    fontWeight: "bold",
  });
});

test("mergeProps uses child style when slot has none", () => {
  const slotProps = {};
  const childProps = {
    style: { color: "blue" },
  };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.style).toEqual({ color: "blue" });
});

test("mergeProps uses slot style when child has none", () => {
  const slotProps = {
    style: { color: "red" },
  };
  const childProps = {};

  const merged = mergeProps(slotProps, childProps);

  expect(merged.style).toEqual({ color: "red" });
});

test("mergeProps allows child props to override slot props for non-special props", () => {
  const slotProps = { disabled: true, type: "button" };
  const childProps = { disabled: false, href: "/home" };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.disabled).toBe(false);
  expect(merged.type).toBe("button");
  expect(merged.href).toBe("/home");
});

test("mergeProps includes props that only exist in slot", () => {
  const slotProps = { disabled: true, "aria-label": "Click me" };
  const childProps = { href: "/home" };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.disabled).toBe(true);
  expect(merged["aria-label"]).toBe("Click me");
  expect(merged.href).toBe("/home");
});

test("mergeProps includes props that only exist in child", () => {
  const slotProps = { disabled: true };
  const childProps = { href: "/home", target: "_blank" };

  const merged = mergeProps(slotProps, childProps);

  expect(merged.href).toBe("/home");
  expect(merged.target).toBe("_blank");
  expect(merged.disabled).toBe(true);
});

test("mergeProps handles multiple event handlers correctly", () => {
  const events: string[] = [];
  const slotProps = {
    onClick: () => events.push("slot-click"),
    onFocus: () => events.push("slot-focus"),
  };
  const childProps = {
    onClick: () => events.push("child-click"),
    onBlur: () => events.push("child-blur"),
  };

  const merged = mergeProps(slotProps, childProps);
  (merged.onClick as Handler)();
  (merged.onFocus as Handler)();
  (merged.onBlur as Handler)();

  expect(events).toEqual([
    "child-click",
    "slot-click",
    "slot-focus",
    "child-blur",
  ]);
});

test("mergeProps handles complex real-world scenario", () => {
  const clickEvents: string[] = [];
  const slotProps = {
    className: "btn btn-primary",
    onClick: () => clickEvents.push("slot"),
    disabled: false,
    "aria-label": "Submit",
    style: { padding: "10px", color: "white" },
  };
  const childProps = {
    className: "custom-link",
    onClick: () => clickEvents.push("child"),
    href: "/submit",
    style: { color: "blue", fontSize: "14px" },
  };

  const merged = mergeProps(slotProps, childProps);
  (merged.onClick as Handler)();

  expect(merged.className).toBe("btn btn-primary custom-link");
  expect(clickEvents).toEqual(["child", "slot"]);
  expect(merged.disabled).toBe(false);
  expect(merged["aria-label"]).toBe("Submit");
  expect(merged.href).toBe("/submit");
  expect(merged.style).toEqual({
    padding: "10px",
    color: "blue",
    fontSize: "14px",
  });
});
