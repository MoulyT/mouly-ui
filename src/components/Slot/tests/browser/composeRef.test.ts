import { test, expect, vi } from "vitest";
import { composeRef } from "@/components/Slot/logic";

test("composeRef updates multiple ref objects", () => {
  const ref1 = { current: null as HTMLElement | null };
  const ref2 = { current: null as HTMLElement | null };
  const element = document.createElement("div");

  const composed = composeRef(ref1, ref2);
  composed(element);

  expect(ref1.current).toBe(element);
  expect(ref2.current).toBe(element);
});

test("composeRef calls multiple callback refs", () => {
  const mockRef1 = vi.fn();
  const mockRef2 = vi.fn();

  const composed = composeRef(mockRef1, mockRef2);
  composed(document.createElement("button"));

  expect(mockRef1).toHaveBeenCalledTimes(1);
  expect(mockRef2).toHaveBeenCalledTimes(1);
});

test("composeRef works with mixed ref types", () => {
  const refObject = { current: null as HTMLElement | null };
  const mockRefCallback = vi.fn();
  const element = document.createElement("span");

  const composed = composeRef(refObject, mockRefCallback);
  composed(element);

  expect(refObject.current).toBe(element);
  expect(mockRefCallback).toHaveBeenCalledWith(element);
});

test("composeRef handles undefined refs gracefully", () => {
  const ref = { current: null as HTMLElement | null };
  const element = document.createElement("div");

  const composed = composeRef(ref, undefined, undefined);
  composed(element);

  expect(ref.current).toBe(element);
});

test("composeRef calls refs with null on unmount", () => {
  const ref1 = { current: document.createElement("div") as HTMLElement | null };
  const ref2 = { current: document.createElement("div") as HTMLElement | null };

  const composed = composeRef(ref1, ref2);
  composed(null);

  expect(ref1.current).toBe(null);
  expect(ref2.current).toBe(null);
});

test("composeRef works with more than two refs", () => {
  const ref1 = { current: null as HTMLElement | null };
  const ref2 = { current: null as HTMLElement | null };
  const ref3 = { current: null as HTMLElement | null };
  const element = document.createElement("div");

  const composed = composeRef(ref1, ref2, ref3);
  composed(element);

  expect(ref1.current).toBe(element);
  expect(ref2.current).toBe(element);
  expect(ref3.current).toBe(element);
});
