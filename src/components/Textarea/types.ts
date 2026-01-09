import type { TextareaHTMLAttributes, Ref } from "react";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /**
   * Reference to the textarea element
   */
  ref?: Ref<HTMLTextAreaElement>;

  /**
   * Textarea field name (used for form submission and as fallback for id)
   */
  name: string;

  /**
   * Label text for the textarea
   */
  label: string;

  /**
   * Visually hide the label while keeping it accessible to screen readers
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Error message to display below the textarea
   * When provided, the textarea will show error styling
   */
  errorMessage?: string;

  /**
   * Hint text to display below the textarea
   * Only shown when there's no error message
   */
  hintText?: string;

  /**
   * Mark the textarea as having an error (without a message)
   * @default false
   */
  error?: boolean;

  /**
   * Enable auto-resize behavior (uses field-sizing: content)
   * When enabled, textarea grows automatically with content
   * @default true
   */
  autoResize?: boolean;
}
