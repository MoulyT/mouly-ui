import type { InputHTMLAttributes, Ref, ReactNode } from "react";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  /**
   * Reference to the input element
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Checkbox field name (used for form submission)
   */
  name: string;

  /**
   * Label text or element for the checkbox.
   * Supports ReactNode for rich content like links in terms & conditions.
   */
  label: ReactNode;

  /**
   * Visually hide the label while keeping it accessible to screen readers
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Whether the checkbox is in an indeterminate state
   * Used for "select all" scenarios where some items are selected
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Error message to display below the checkbox
   * When provided, the checkbox will show error styling
   */
  errorMessage?: string;

  /**
   * Hint text to display below the checkbox
   * Only shown when there's no error message
   */
  hintText?: string;

  /**
   * Mark the checkbox as having an error (without a message)
   * @default false
   */
  error?: boolean;
}
