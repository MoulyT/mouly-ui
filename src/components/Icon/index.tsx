import { clsx } from "clsx";
import { iconStyles } from "./styles";
import type { IconProps } from "./types";

/**
 * Icon component for rendering SVG icons with consistent sizing.
 *
 * @example
 * ```tsx
 * import { Icon } from "@/components/Icon";
 * import SearchIcon from "@/assets/icons/search.svg?react";
 *
 * <Icon component={SearchIcon} size="m" />
 * ```
 */
export function Icon({
  component: Component,
  size,
  ariaHidden = true,
  className,
}: IconProps) {
  return (
    <div className={clsx(iconStyles({ size }), className)}>
      <Component aria-hidden={ariaHidden} />
    </div>
  );
}
