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
  selectContainerStyles,
  selectLabelStyles,
  selectWrapperStyles,
  selectStyles,
  selectHelperStyles,
} from "./styles";
import type { SelectProps } from "./types";

export function Select({
  name,
  label,
  id,
  hideLabel = false,
  errorMessage,
  hintText,
  error = false,
  options,
  placeholder,
  className,
  ref,
  required = false,
  ...selectProps
}: SelectProps) {
  const generatedId = useId();

  const fieldId = id ?? generatedId;
  const hasError = hasFieldError(error, errorMessage);
  const helperId = getHelperId(fieldId);
  const ariaDescribedBy = getAriaDescribedBy(fieldId, errorMessage, hintText);
  const helperContent = getHelperContent(errorMessage, hintText);

  const PLACEHOLDER_VALUE = "";

  return (
    <div className={clsx(selectContainerStyles(), className)}>
      <label
        htmlFor={fieldId}
        className={selectLabelStyles({ hidden: hideLabel })}
      >
        {label}
      </label>

      <div className={selectWrapperStyles({ hasError })}>
        <select
          ref={ref}
          id={fieldId}
          name={name}
          className={selectStyles()}
          aria-invalid={hasError}
          aria-describedby={ariaDescribedBy}
          defaultValue={placeholder ? PLACEHOLDER_VALUE : undefined}
          required={required}
          {...selectProps}
        >
          {placeholder && (
            <option value={PLACEHOLDER_VALUE} disabled={required}>
              {placeholder}
            </option>
          )}
          {options.map((option, idx) => (
            <option key={`${option.value}-${idx}`} value={option.value}>
              {option.content ?? option.label}
            </option>
          ))}
        </select>
      </div>

      {helperContent && (
        <p
          id={helperId}
          className={selectHelperStyles({
            variant: getHelperVariant(errorMessage),
          })}
        >
          {helperContent}
        </p>
      )}
    </div>
  );
}
