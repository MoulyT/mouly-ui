import { useCallback } from "react";
import { clsx } from "clsx";
import { composeRef } from "../Slot/logic";
import { useAccordionContext, useAccordionItemContext } from "./context";
import { accordionTriggerStyles } from "./styles";
import type { AccordionTriggerProps } from "./types";

export function AccordionTrigger({
  className,
  children,
  ref,
  ...props
}: AccordionTriggerProps) {
  const { toggle, isOpen, disabled, triggerId, contentId, value } =
    useAccordionItemContext();
  const { collapsible, registerTrigger } = useAccordionContext();

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
      id={triggerId}
      onClick={toggle}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-controls={contentId}
      aria-disabled={!collapsible && isOpen ? "true" : undefined}
      className={clsx(accordionTriggerStyles(), className)}
      {...props}
    >
      {children}
    </button>
  );
}
