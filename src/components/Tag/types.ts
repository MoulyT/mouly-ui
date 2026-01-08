import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { tagStyles } from "./styles";

export interface TagProps extends VariantProps<typeof tagStyles> {
  /**
   * The content of the tag
   */
  children: ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}
