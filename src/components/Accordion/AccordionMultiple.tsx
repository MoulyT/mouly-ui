import { useState, useRef, type KeyboardEvent } from "react";
import { AccordionContext } from "./context";
import type { AccordionMultipleProps } from "./types";

export function AccordionMultiple({
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  children,
  className,
  ref,
}: AccordionMultipleProps) {
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? []);
  const currentValue = isControlled ? valueProp : internalValue;

  const handleValueChange = (newValue: string[]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const handleItemOpen = (itemValue: string) => {
    const newValue = [...currentValue, itemValue];
    handleValueChange(newValue);
  };

  const handleItemClose = (itemValue: string) => {
    const newValue = currentValue.filter((v) => v !== itemValue);
    handleValueChange(newValue);
  };

  const registerTrigger = (value: string, node: HTMLButtonElement | null) => {
    if (node) {
      triggerRefs.current.set(value, node);
    } else {
      triggerRefs.current.delete(value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!["Home", "End", "ArrowDown", "ArrowUp"].includes(event.key)) return;

    const triggers = Array.from(triggerRefs.current.values()).filter(
      (trigger) => !trigger.disabled,
    );

    const currentIndex = triggers.findIndex(
      (t) => t === document.activeElement,
    );
    if (currentIndex === -1) return;

    event.preventDefault();

    let nextIndex = currentIndex;
    switch (event.key) {
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = triggers.length - 1;
        break;
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
    }

    triggers[nextIndex]?.focus();
  };

  return (
    <AccordionContext.Provider
      value={{
        value: currentValue,
        onItemOpen: handleItemOpen,
        onItemClose: handleItemClose,
        disabled,
        collapsible: true,
        registerTrigger,
      }}
    >
      <div ref={ref} className={className} onKeyDown={handleKeyDown}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
