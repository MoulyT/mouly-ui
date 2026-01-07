import type { SlotProps, SlottableProps } from "./types";
import { cloneElement, isValidElement, Fragment, Children } from "react";
import {
  isSlottable,
  mergeProps,
  composeRef,
  getElementProps,
  getElementRef,
} from "./logic";

export const SLOTTABLE_IDENTIFIER = Symbol("mouly-ui-slottable");

export const Slottable = (props: SlottableProps) => {
  return <>{props.children}</>;
};

Slottable.__slottableId = SLOTTABLE_IDENTIFIER;

/**
 * Merges its props with its child element, enabling polymorphic components via the asChild pattern.
 */
export const Slot = <T extends HTMLElement = HTMLElement>(
  props: SlotProps<T>,
) => {
  const { children, ref, ...slotProps } = props;
  const childrenArray = Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (!slottable) {
    if (!isValidElement(children)) {
      return null;
    }

    const childProps = getElementProps(children);
    const childRef = getElementRef<T>(childProps);
    const mergedProps = mergeProps(slotProps, childProps);
    const composedRef = composeRef<T>(ref, childRef);

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
      return getElementProps(elementInsideSlottable).children;
    }
    return child;
  });

  const childProps = getElementProps(elementInsideSlottable);
  const childRef = getElementRef<T>(childProps);
  const mergedProps = mergeProps(slotProps, childProps);
  const composedRef = composeRef<T>(ref, childRef);

  if (elementInsideSlottable.type !== Fragment) {
    mergedProps.ref = composedRef;
  }

  return cloneElement(elementInsideSlottable, mergedProps, ...newChildren);
};
