import { useId, useEffect, useRef } from "react";
import { clsx } from "clsx";
import { composeRef } from "@/components/Slot/logic";
import {
  hasFieldError,
  getHelperId,
  getAriaDescribedBy,
  getHelperContent,
  getHelperVariant,
} from "@/components/shared/form-logic";
import {
  checkboxContainerStyles,
  checkboxBoxStyles,
  checkboxLabelStyles,
  checkboxHelperStyles,
} from "./styles";
import type { CheckboxProps } from "./types";

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    data-testid="check-icon"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </svg>
);

const MinusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    data-testid="minus-icon"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
);

/**
 * Checkbox component for boolean input with optional indeterminate state.
 */
export function Checkbox({
  name,
  label,
  id,
  hideLabel = false,
  indeterminate = false,
  errorMessage,
  hintText,
  error = false,
  className,
  ref,
  ...inputProps
}: CheckboxProps) {
  const generatedId = useId();
  const internalRef = useRef<HTMLInputElement | null>(null);

  const fieldId = id ?? generatedId;
  const hasError = hasFieldError(error, errorMessage);
  const helperId = getHelperId(fieldId);
  const ariaDescribedBy = getAriaDescribedBy(fieldId, errorMessage, hintText);
  const helperContent = getHelperContent(errorMessage, hintText);

  // Sync indeterminate property (not available as HTML attribute)
  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={clsx(checkboxContainerStyles(), className)}>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          ref={composeRef(internalRef, ref)}
          id={fieldId}
          name={name}
          type="checkbox"
          className="peer sr-only"
          aria-invalid={hasError}
          aria-describedby={ariaDescribedBy}
          {...inputProps}
        />

        <span
          className={clsx(
            checkboxBoxStyles({ hasError }),
            "peer-checked:*:block",
          )}
        >
          {indeterminate ? (
            <MinusIcon className="hidden size-3.5 text-white" />
          ) : (
            <CheckIcon className="hidden size-3.5 text-white" />
          )}
        </span>

        <div className="flex flex-col">
          <span className={checkboxLabelStyles({ hidden: hideLabel })}>
            {label}
          </span>

          {helperContent && (
            <p
              id={helperId}
              className={checkboxHelperStyles({
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
