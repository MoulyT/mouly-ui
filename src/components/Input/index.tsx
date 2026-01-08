import { useState, useId, useRef } from "react";
import { clsx } from "clsx";
import { Icon } from "@/components/Icon";
import {
  inputContainerStyles,
  inputLabelStyles,
  inputWrapperStyles,
  inputStyles,
  inputHelperStyles,
} from "./styles";
import { composeRef } from "@/components/Slot/logic";
import {
  resolveInputType,
  hasInputError,
  getAriaDescribedBy,
  getHelperId,
  getHelperContent,
  getHelperVariant,
  getToggleAriaLabel,
  togglePasswordWithCursorRestore,
} from "./logic";
import type { InputProps } from "./types";

const DefaultEyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const DefaultEyeSlashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

export function Input({
  name,
  label,
  id,
  hideLabel = false,
  errorMessage,
  disabled,
  type = "text",
  hintText,
  error = false,
  icon,
  passwordVisibleIcon,
  passwordHiddenIcon,
  className,
  ref,
  ...inputProps
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const internalRef = useRef<HTMLInputElement | null>(null);

  const inputId = id ?? generatedId;
  const inputError = hasInputError(error, errorMessage);
  const inputType = resolveInputType(type, showPassword);
  const ariaDescribedBy = getAriaDescribedBy(inputId, errorMessage, hintText);
  const helperContent = getHelperContent(errorMessage, hintText);
  const EyeIcon = passwordVisibleIcon ?? DefaultEyeIcon;
  const EyeSlashIcon = passwordHiddenIcon ?? DefaultEyeSlashIcon;

  const handleTogglePassword = () => {
    togglePasswordWithCursorRestore(internalRef.current, setShowPassword);
  };

  return (
    <div className={clsx(inputContainerStyles(), className)}>
      <label
        htmlFor={inputId}
        className={inputLabelStyles({ hidden: hideLabel })}
      >
        {label}
      </label>

      <div className={inputWrapperStyles({ hasError: inputError })}>
        <input
          ref={composeRef(internalRef, ref)}
          id={inputId}
          name={name}
          type={inputType}
          disabled={disabled}
          className={inputStyles()}
          aria-invalid={inputError}
          aria-describedby={ariaDescribedBy}
          {...inputProps}
        />

        {icon && (
          <Icon
            component={icon}
            size="m"
            className="pointer-events-none mr-3 text-gray-400"
          />
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="mr-3 inline-flex rounded p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={getToggleAriaLabel(showPassword)}
          >
            <Icon
              component={showPassword ? EyeIcon : EyeSlashIcon}
              size="m"
              ariaHidden={false}
            />
          </button>
        )}
      </div>

      {helperContent && (
        <p
          id={getHelperId(inputId)}
          className={inputHelperStyles({
            variant: getHelperVariant(errorMessage),
          })}
        >
          {helperContent}
        </p>
      )}
    </div>
  );
}
