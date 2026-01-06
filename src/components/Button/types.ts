import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonStyles } from "./styles";

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  ref?: Ref<HTMLButtonElement>;
  /**
   * When true, the Button will render its child instead of a button element.
   * This allows the Button to be polymorphic - it can render as a link, custom element, etc.
   * while maintaining all Button styling and behavior.
   */
  asChild?: boolean;

  /**
   * The content of the button
   */
  children?: ReactNode;

  /**
   * Icon component to display alongside the button text
   */
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  /**
   * Position of the icon relative to the text
   * @default "right"
   */
  iconPosition?: "left" | "right";

  /**
   * When true, hides the text visually but keeps it accessible to screen readers
   * @default false
   */
  hideText?: boolean;
}
