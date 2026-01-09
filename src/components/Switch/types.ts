import type { InputHTMLAttributes, Ref, ReactNode } from "react";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /**
   * Reference to the input element
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Switch field name (used for form submission)
   */
  name: string;

  /**
   * Label text or element for the switch.
   * Supports ReactNode for rich content.
   */
  label: ReactNode;

  /**
   * Visually hide the label while keeping it accessible to screen readers
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Error message to display below the switch
   * When provided, the switch will show error styling
   */
  errorMessage?: string;

  /**
   * Hint text to display below the switch
   * Only shown when there's no error message
   */
  hintText?: string;

  /**
   * Mark the switch as having an error (without a message)
   * @default false
   */
  error?: boolean;
}
