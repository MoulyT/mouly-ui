import { useCallback } from "react";
import { clsx } from "clsx";
import { useTabsContext } from "./context";
import { tabsTriggerStyles } from "./styles";
import type { TabsTriggerProps } from "./types";
import { composeRef } from "../Slot/logic";

export function TabsTrigger({
  value,
  disabled,
  className,
  children,
  ref,
  ...props
}: TabsTriggerProps) {
  const {
    value: currentValue,
    onValueChange,
    orientation,
    disabled: rootDisabled,
    registerTrigger,
  } = useTabsContext();

  const isActive = value === currentValue;
  const isDisabled = disabled || rootDisabled;

  const triggerId = `tabs-trigger-${value}`;
  const contentId = `tabs-content-${value}`;

  const registerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      registerTrigger(value, node);
    },
    [registerTrigger, value],
  );

  const composedRef = composeRef(registerRef, ref);

  return (
    <button
      ref={composedRef}
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={isActive}
      aria-controls={contentId}
      disabled={isDisabled}
      tabIndex={isActive ? 0 : -1}
      onClick={() => !isDisabled && onValueChange(value)}
      className={clsx(tabsTriggerStyles({ active: isActive }), className)}
      data-state={isActive ? "active" : "inactive"}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </button>
  );
}
