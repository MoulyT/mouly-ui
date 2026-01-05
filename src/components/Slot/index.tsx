import type { SlotProps } from "./types";
import { cloneElement, isValidElement } from "react";
import { mergeProps, composeRef } from "./logic";

/**
 * Merges its props with its child element, enabling polymorphic components via the asChild pattern.
 */
export const Slot = (props: SlotProps) => {
  const { children, ref, ...slotProps } = props;
  if (!isValidElement(children)) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childProps = children.props as Record<string, any>;
  const mergedProps = mergeProps(slotProps, childProps);
  const composedRef = composeRef(ref, childProps.ref);
  mergedProps.ref = composedRef;

  return cloneElement(children, mergedProps);
};
