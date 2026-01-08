import type { InputHTMLAttributes, Ref } from "react";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /**
   * Reference to the input element
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Input field name (used for form submission and as fallback for id)
   */
  name: string;

  /**
   * Label text for the input
   */
  label: string;

  /**
   * Visually hide the label while keeping it accessible to screen readers
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Error message to display below the input
   * When provided, the input will show error styling
   */
  errorMessage?: string;

  /**
   * Hint text to display below the input
   * Only shown when there's no error message
   */
  hintText?: string;

  /**
   * Mark the input as having an error (without a message)
   * @default false
   */
  error?: boolean;

  /**
   * Icon component to display inside the input (right side)
   */
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  /**
   * Custom icon to show when password is visible (eye open)
   * Only used when type="password"
   */
  passwordVisibleIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  /**
   * Custom icon to show when password is hidden (eye closed)
   * Only used when type="password"
   */
  passwordHiddenIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
