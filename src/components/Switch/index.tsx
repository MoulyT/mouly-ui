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
  switchContainerStyles,
  switchTrackStyles,
  switchLabelStyles,
  switchHelperStyles,
} from "./styles";
import type { SwitchProps } from "./types";

/**
 * Switch component for toggling between two states.
 * Uses role="switch" for proper accessibility.
 */
export function Switch({
  name,
  label,
  id,
  hideLabel = false,
  errorMessage,
  hintText,
  error = false,
  className,
  ref,
  ...inputProps
}: SwitchProps) {
  const generatedId = useId();

  const fieldId = id ?? generatedId;
  const hasError = hasFieldError(error, errorMessage);
  const helperId = getHelperId(fieldId);
  const ariaDescribedBy = getAriaDescribedBy(fieldId, errorMessage, hintText);
  const helperContent = getHelperContent(errorMessage, hintText);

  return (
    <div className={clsx(switchContainerStyles(), className)}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          ref={ref}
          id={fieldId}
          name={name}
          type="checkbox"
          role="switch"
          className="peer sr-only"
          aria-invalid={hasError}
          aria-describedby={ariaDescribedBy}
          {...inputProps}
        />

        <span
          data-testid="switch-track"
          className={switchTrackStyles({ hasError })}
        />

        <div className="flex flex-col">
          <span className={switchLabelStyles({ hidden: hideLabel })}>
            {label}
          </span>

          {helperContent && (
            <p
              id={helperId}
              className={switchHelperStyles({
                variant: getHelperVariant(errorMessage),
              })}
            >
              {helperContent}
            </p>
          )}
        </div>
      </label>
    </div>
  );
}
