import { test, expect } from "vitest";
import { combineEventHandlers } from "@/components/Slot/logic";

test("combineEventHandlers returns undefined when both handlers are undefined", () => {
  const childHandler = undefined;
  const slotHandler = undefined;

  const result = combineEventHandlers(childHandler, slotHandler);

  expect(result).toBe(undefined);
});

test("combineEventHandlers returns childHandler when only child exists", () => {
  const childHandler = (value: string) => `child: ${value}`;
  const slotHandler = undefined;

  const result = combineEventHandlers(childHandler, slotHandler);

  expect(result).toBe(childHandler);
});

test("combineEventHandlers returns slotHandler when only slot exists", () => {
  const childHandler = undefined;
  const slotHandler = (value: string) => `slot: ${value}`;

  const result = combineEventHandlers(childHandler, slotHandler);

  expect(result).toBe(slotHandler);
});

test("combineEventHandlers executes child handler first then slot handler", () => {
  const executionOrder: string[] = [];
  const childHandler = () => executionOrder.push("child");
  const slotHandler = () => executionOrder.push("slot");

  const result = combineEventHandlers(childHandler, slotHandler);
  result?.();

  expect(executionOrder).toEqual(["child", "slot"]);
});

test("combineEventHandlers passes arguments to both handlers", () => {
  const childArgs: unknown[] = [];
  const slotArgs: unknown[] = [];
  const childHandler = (...args: unknown[]) => childArgs.push(...args);
  const slotHandler = (...args: unknown[]) => slotArgs.push(...args);

  const result = combineEventHandlers(childHandler, slotHandler);
  result?.("event", 123, { foo: "bar" });

  expect(childArgs).toEqual(["event", 123, { foo: "bar" }]);
  expect(slotArgs).toEqual(["event", 123, { foo: "bar" }]);
});

test("combineEventHandlers returns the result from child handler", () => {
  const childHandler = () => "child-result";
  const slotHandler = () => "slot-result";

  const result = combineEventHandlers(childHandler, slotHandler);
  const returnValue = result?.();

  expect(returnValue).toBe("child-result");
});

test("combineEventHandlers combined handler works with no arguments", () => {
  let childCalled = false;
  let slotCalled = false;
  const childHandler = () => {
    childCalled = true;
  };
  const slotHandler = () => {
    slotCalled = true;
  };

  const result = combineEventHandlers(childHandler, slotHandler);
  result?.();

  expect(childCalled).toBe(true);
  expect(slotCalled).toBe(true);
});
