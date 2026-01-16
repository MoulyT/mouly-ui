import { clsx } from "clsx";
import { useTabsContext } from "./context";
import { tabsListStyles } from "./styles";
import type { TabsListProps } from "./types";

export function TabsList({
  className,
  children,
  ref,
  ...props
}: TabsListProps) {
  const { orientation } = useTabsContext();

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      className={clsx(tabsListStyles(), className)}
      {...props}
    >
      {children}
    </div>
  );
}
