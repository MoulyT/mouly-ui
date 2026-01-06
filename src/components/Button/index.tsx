import { clsx } from "clsx";
import { Slot, Slottable } from "../Slot";
import { buttonStyles } from "./styles";
import type { ButtonProps } from "./types";

/**
 * Button component with support for multiple variants and the asChild pattern.
 */
export function Button({
  children,
  className,
  variant,
  size,
  asChild = false,
  icon: Icon,
  iconPosition = "right",
  hideText = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const computedClassName = clsx(
    buttonStyles({ variant, size, className }),
    hideText && asChild && "sr-only",
  );

  return (
    <Comp ref={ref} className={computedClassName} {...props}>
      {iconPosition === "left" && Icon && (
        <Icon className="h-5 w-5" aria-hidden="true" />
      )}
      {asChild ? (
        <Slottable>{children}</Slottable>
      ) : (
        <span className={clsx("text-center", hideText && "sr-only")}>
          {children}
        </span>
      )}
      {iconPosition === "right" && Icon && (
        <Icon className="h-5 w-5" aria-hidden="true" />
      )}
    </Comp>
  );
}
