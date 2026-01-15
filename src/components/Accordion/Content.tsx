import { clsx } from "clsx";
import { useAccordionItemContext } from "./context";
import { accordionContentStyles } from "./styles";
import type { AccordionContentProps } from "./types";

export function AccordionContent({
  className,
  children,
  ref,
  ...props
}: AccordionContentProps) {
  const { isOpen, contentId, triggerId } = useAccordionItemContext();

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={clsx(
        accordionContentStyles(),
        isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
        className,
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="w-full overflow-hidden">{children}</div>
    </div>
  );
}
