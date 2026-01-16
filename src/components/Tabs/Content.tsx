import { clsx } from "clsx";
import { useTabsContext } from "./context";
import { tabsContentStyles } from "./styles";
import type { TabsContentProps } from "./types";

export function TabsContent({
  value,
  className,
  children,
  ref,
  ...props
}: TabsContentProps) {
  const { value: currentValue, orientation } = useTabsContext();

  const isActive = value === currentValue;

  const triggerId = `tabs-trigger-${value}`;
  const contentId = `tabs-content-${value}`;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={contentId}
      aria-labelledby={triggerId}
      hidden={!isActive}
      tabIndex={0}
      className={clsx(tabsContentStyles(), className)}
      data-state={isActive ? "active" : "inactive"}
      data-orientation={orientation}
      {...props}
    >
      {isActive && children}
    </div>
  );
}
