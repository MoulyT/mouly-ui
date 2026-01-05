import { test, expect } from "vitest";
import { isSlottable } from "@/components/Slot/logic";
import { SLOTTABLE_IDENTIFIER } from "@/components/Slot";
import { createElement } from "react";

test("isSlottable returns false for HTML element", () => {
  const element = createElement("div", null, "content");

  expect(isSlottable(element)).toBe(false);
});

test("isSlottable returns false for component without __slottableId", () => {
  const Component = () => null;
  const element = createElement(Component);

  expect(isSlottable(element)).toBe(false);
});

test("isSlottable returns false for component with different __slottableId", () => {
  const OtherSlottable = (() => null) as SlottableComponentType;
  OtherSlottable.__slottableId = Symbol("other-library.slottable");
  const element = createElement(OtherSlottable);

  expect(isSlottable(element)).toBe(false);
});

test("isSlottable returns true for component with correct __slottableId", () => {
  const ValidSlottable = (() => null) as SlottableComponentType;
  ValidSlottable.__slottableId = SLOTTABLE_IDENTIFIER;
  const element = createElement(ValidSlottable, { children: "content" });

  expect(isSlottable(element)).toBe(true);
});

type SlottableComponentType = {
  (): null;
  __slottableId: symbol;
};
