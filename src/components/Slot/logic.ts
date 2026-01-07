import {
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import type {
  AnyElementProps,
  Handler,
  MergedProps,
  SlottableProps,
} from "./types";
import { SLOTTABLE_IDENTIFIER } from ".";

const EVENT_HANDLER_REGEX = /^on[A-Z]/;

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

export function mergeProps<
  S extends AnyElementProps,
  C extends AnyElementProps,
>(slotProps: S, childProps: C): MergedProps<S, C> {
  const mergedProps = { ...childProps } as MergedProps<S, C>;

  for (const propKey in slotProps) {
    const slotValue = slotProps[propKey];
    const childValue = childProps[propKey];

    if (EVENT_HANDLER_REGEX.test(propKey)) {
      (mergedProps as AnyElementProps)[propKey] = combineEventHandlers(
        childValue as Handler | undefined,
        slotValue as Handler | undefined,
      );
    } else if (propKey === "className") {
      (mergedProps as AnyElementProps)[propKey] = [slotValue, childValue]
        .filter(Boolean)
        .join(" ");
    } else if (propKey === "style") {
      (mergedProps as AnyElementProps)[propKey] = {
        ...(slotValue as CSSProperties | undefined),
        ...(childValue as CSSProperties | undefined),
      };
    } else if (!(propKey in childProps)) {
      (mergedProps as AnyElementProps)[propKey] = slotValue;
    }
  }

  return mergedProps as MergedProps<S, C>;
}

export function setRef<T>(ref: Ref<T> | undefined, value: T): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as RefObject<T>).current = value;
  }
}

export function composeRef<T>(
  ...refs: (Ref<T> | undefined)[]
): (value: T | null) => void {
  return (value: T | null) => {
    refs.forEach((ref) => setRef(ref, value));
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

export function getElementProps(element: ReactElement): AnyElementProps {
  return element.props as AnyElementProps;
}

export function getElementRef<T = HTMLElement>(
  props: AnyElementProps,
): Ref<T> | undefined {
  const ref = props.ref;
  if (ref === null || ref === undefined) {
    return undefined;
  }
  return ref as Ref<T>;
}
