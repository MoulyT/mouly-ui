import type { SlotProps, SlottableProps } from "./types";
import { cloneElement, isValidElement, Fragment, Children } from "react";
import { isSlottable, mergeProps, composeRef } from "./logic";

export const SLOTTABLE_IDENTIFIER = Symbol("mouly-ui-slottable");

export const Slottable = (props: SlottableProps) => {
  return <>{props.children}</>;
};

Slottable.__slottableId = SLOTTABLE_IDENTIFIER;

/**
 * Merges its props with its child element, enabling polymorphic components via the asChild pattern.
 */
export const Slot = (props: SlotProps) => {
  const { children, ref, ...slotProps } = props;
  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (!slottable) {
    if (!isValidElement(children)) {
      return null;
    }

    const childProps = children.props as Record<string, unknown>;
    const childRef = (childProps.ref ?? undefined) as
      | React.Ref<HTMLElement>
      | undefined;
    const mergedProps = mergeProps(slotProps, childProps);
    const composedRef = composeRef(ref, childRef);

    if (children.type !== Fragment) {
      mergedProps.ref = composedRef;
    }

    return cloneElement(children, mergedProps);
  }

  const elementInsideSlottable = slottable.props.children;

  if (!isValidElement(elementInsideSlottable)) {
    return null;
  }

  const newChildren = childrenArray.map((child) => {
    if (child === slottable) {
      const elementProps = elementInsideSlottable.props as Record<
        string,
        unknown
      >;
      return elementProps.children as React.ReactNode;
    }
    return child;
  });

  const childProps = elementInsideSlottable.props as Record<string, unknown>;
  const childRef = (childProps.ref ?? undefined) as
    | React.Ref<HTMLElement>
    | undefined;
  const mergedProps = mergeProps(slotProps, childProps);
  const composedRef = composeRef(ref, childRef);

  if (elementInsideSlottable.type !== Fragment) {
    mergedProps.ref = composedRef;
  }

  return cloneElement(elementInsideSlottable, mergedProps, ...newChildren);
};
