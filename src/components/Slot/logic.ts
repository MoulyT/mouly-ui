/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import type { Handler, SlottableProps } from "./types";
import { SLOTTABLE_IDENTIFIER } from ".";

/** Composes two event handlers. Child executes first, then parent. */
export function combineEventHandlers(
  childHandler: Handler | undefined,
  slotHandler: Handler | undefined,
): Handler | undefined {
  if (!childHandler) return slotHandler;
  if (!slotHandler) return childHandler;
  return (...args: unknown[]) => {
    const result = childHandler(...args);
    slotHandler(...args);
    return result;
  };
}

/** Merges props with special handling: events composed, className concatenated, style merged. */
export function mergeProps(
  slotProps: Record<string, any>,
  childProps: Record<string, any>,
) {
  const mergedProps = { ...childProps };
  const EVENT_HANDLER_REGEX = /on[A-Z]/;

  for (const propKey in childProps) {
    const slotValue = slotProps[propKey];
    const childValue = childProps[propKey];
    if (EVENT_HANDLER_REGEX.test(propKey)) {
      mergedProps[propKey] = combineEventHandlers(
        childValue as Handler,
        slotValue as Handler,
      );
    } else if (propKey === "className") {
      mergedProps[propKey] = [slotValue, childValue].filter(Boolean).join(" ");
    } else if (propKey === "style") {
      mergedProps[propKey] = {
        ...(slotValue as object),
        ...(childValue as object),
      };
    }
  }
  return { ...slotProps, ...mergedProps };
}

/** Updates a ref (callback or object) with a value. */
export function setRef<T>(ref: Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

/** Creates a callback ref that updates multiple refs. */
export function composeRef<T>(...refs: (Ref<T> | undefined)[]) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      setRef(ref, value);
    });
  };
}

export function isSlottable(
  child: ReactNode,
): child is ReactElement<SlottableProps> {
  return (
    isValidElement(child) &&
    typeof child.type === "function" &&
    "__slottableId" in child.type &&
    child.type.__slottableId === SLOTTABLE_IDENTIFIER
  );
}
