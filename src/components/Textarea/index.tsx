import { useId } from "react";
import { clsx } from "clsx";
import {
  hasFieldError,
  getHelperId,
  getAriaDescribedBy,
  getHelperContent,
  getHelperVariant,
} from "@/components/shared/form-logic";
import {
  textareaContainerStyles,
  textareaLabelStyles,
  textareaWrapperStyles,
  textareaStyles,
  textareaHelperStyles,
} from "./styles";
import type { TextareaProps } from "./types";

/**
 * Textarea component for multi-line text input.
 */
export function Textarea({
  name,
  label,
  id,
  hideLabel = false,
  errorMessage,
  hintText,
  error = false,
  autoResize = true,
  className,
  ref,
  rows = 3,
  ...textareaProps
}: TextareaProps) {
  const generatedId = useId();

  const fieldId = id ?? generatedId;
  const hasError = hasFieldError(error, errorMessage);
  const helperId = getHelperId(fieldId);
  const ariaDescribedBy = getAriaDescribedBy(fieldId, errorMessage, hintText);
  const helperContent = getHelperContent(errorMessage, hintText);

  return (
    <div className={clsx(textareaContainerStyles(), className)}>
      <label
        htmlFor={fieldId}
        className={textareaLabelStyles({ hidden: hideLabel })}
      >
        {label}
      </label>

      <div className={textareaWrapperStyles({ hasError })}>
        <textarea
          ref={ref}
          id={fieldId}
          name={name}
          rows={rows}
          className={clsx(
            textareaStyles(),
            !autoResize && "[field-sizing:fixed] min-h-[160px]",
          )}
          aria-invalid={hasError}
          aria-describedby={ariaDescribedBy}
          {...textareaProps}
        />
      </div>

      {helperContent && (
        <p
          id={helperId}
          className={textareaHelperStyles({
            variant: getHelperVariant(errorMessage),
          })}
        >
          {helperContent}
        </p>
      )}
    </div>
  );
}
