import { useId } from "react";
import { clsx } from "clsx";
import { useAccordionContext, AccordionItemContext } from "./context";
import { accordionItemStyles } from "./styles";
import type { AccordionItemProps } from "./types";

export function AccordionItem({
  value,
  disabled,
  className,
  children,
  ref,
  ...props
}: AccordionItemProps) {
  const context = useAccordionContext();
  const triggerId = useId();
  const contentId = useId();

  const isOpen = context.value.includes(value);
  const itemDisabled = disabled || context.disabled;

  const toggle = () => {
    if (itemDisabled) return;

    if (isOpen) {
      context.onItemClose(value);
    } else {
      context.onItemOpen(value);
    }
  };

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        toggle,
        disabled: itemDisabled,
        triggerId,
        contentId,
      }}
    >
      <div
        ref={ref}
        className={clsx(accordionItemStyles(), className)}
        data-state={isOpen ? "open" : "closed"}
        data-disabled={itemDisabled ? "" : undefined}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
