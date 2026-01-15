import { useState, useRef, type KeyboardEvent } from "react";
import { AccordionContext } from "./context";
import type { AccordionSingleProps } from "./types";

export function AccordionSingle({
  value: valueProp,
  defaultValue,
  onValueChange,
  collapsible = false,
  disabled,
  children,
  className,
  ref,
}: AccordionSingleProps) {
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? valueProp : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const handleItemOpen = (itemValue: string) => {
    handleValueChange(itemValue);
  };

  const handleItemClose = () => {
    if (collapsible) {
      handleValueChange("");
    }
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

  const contextValue = currentValue ? [currentValue] : [];

  return (
    <AccordionContext.Provider
      value={{
        value: contextValue,
        onItemOpen: handleItemOpen,
        onItemClose: handleItemClose,
        disabled,
        collapsible,
        registerTrigger,
      }}
    >
      <div ref={ref} className={className} onKeyDown={handleKeyDown}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
