import { clsx } from "clsx";
import { useAccordionItemContext } from "./context";
import { accordionIconStyles } from "./styles";
import type { AccordionIconProps } from "./types";

export function AccordionIcon({ className, ref }: AccordionIconProps) {
  const { isOpen } = useAccordionItemContext();

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={clsx(accordionIconStyles(), isOpen && "rotate-180", className)}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
