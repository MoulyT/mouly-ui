import { useState, useRef, type KeyboardEvent } from "react";
import { TabsContext } from "./context";
import type { TabsRootProps } from "./types";

export function TabsRoot({
  value: valueProp,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  disabled,
  children,
  className,
  ref,
  ...props
}: TabsRootProps) {
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

  const registerTrigger = (value: string, node: HTMLButtonElement | null) => {
    if (node) {
      triggerRefs.current.set(value, node);

      if (!currentValue && triggerRefs.current.size === 1) {
        handleValueChange(value);
      }
    } else {
      triggerRefs.current.delete(value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const keys =
      orientation === "horizontal"
        ? ["ArrowLeft", "ArrowRight", "Home", "End"]
        : ["ArrowUp", "ArrowDown", "Home", "End"];

    if (!keys.includes(event.key)) return;

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
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
    }

    const nextTrigger = triggers[nextIndex];
    if (nextTrigger) {
      nextTrigger.focus();

      const nextValue = Array.from(triggerRefs.current.entries()).find(
        ([, ref]) => ref === nextTrigger,
      )?.[0];

      if (nextValue) {
        handleValueChange(nextValue);
      }
    }
  };

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        orientation,
        disabled,
        registerTrigger,
      }}
    >
      <div
        ref={ref}
        className={className}
        onKeyDown={handleKeyDown}
        data-orientation={orientation}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}
