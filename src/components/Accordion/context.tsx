import { createContext, useContext } from "react";
import type { AccordionContextValue, AccordionItemContextValue } from "./types";

export const AccordionContext = createContext<AccordionContextValue | null>(
  null,
);

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion.Item must be used within Accordion.Root");
  }
  return context;
}

export const AccordionItemContext =
  createContext<AccordionItemContextValue | null>(null);

export function useAccordionItemContext(): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "Accordion.Trigger/Content/Icon must be used within Accordion.Item",
    );
  }
  return context;
}
