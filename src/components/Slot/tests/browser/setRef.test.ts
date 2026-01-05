import { test, expect, vi } from "vitest";
import { setRef } from "@/components/Slot/logic";

test("setRef updates ref object current property", () => {
  const ref = { current: null as HTMLElement | null };
  const element = document.createElement("div");

  setRef(ref, element);

  expect(ref.current).toBe(element);
});

test("setRef calls callback ref with element", () => {
  const mockRef = vi.fn();
  const element = document.createElement("button");

  setRef(mockRef, element);

  expect(mockRef).toHaveBeenCalledWith(element);
  expect(mockRef).toHaveBeenCalledTimes(1);
});

test("setRef calls callback ref with null on unmount", () => {
  const mockRef = vi.fn();

  setRef(mockRef, null);

  expect(mockRef).toHaveBeenCalledWith(null);
});
