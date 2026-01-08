import { clsx } from "clsx";
import { tagStyles } from "./styles";
import type { TagProps } from "./types";

/**
 * Tag component for displaying labels, badges, or status indicators.
 *
 * @example
 * ```tsx
 * <Tag variant="primary">New</Tag>
 * <Tag variant="success">Completed</Tag>
 * <Tag variant="danger">Error</Tag>
 * ```
 */
export function Tag({ variant, children, className }: TagProps) {
  return (
    <span className={clsx(tagStyles({ variant }), className)}>{children}</span>
  );
}
