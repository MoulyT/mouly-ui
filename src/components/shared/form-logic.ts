/**
 * Shared form field logic utilities.
 * Used by Input, Checkbox, and other form components.
 */

export function hasFieldError(
  error: boolean | undefined,
  errorMessage: string | undefined,
): boolean {
  return error === true || !!errorMessage;
}

export function getHelperId(fieldId: string): string {
  return `${fieldId}-helper`;
}

export function getAriaDescribedBy(
  fieldId: string,
  errorMessage: string | undefined,
  hintText: string | undefined,
): string | undefined {
  if (errorMessage || hintText) {
    return getHelperId(fieldId);
  }
  return undefined;
}

export function getHelperContent(
  errorMessage: string | undefined,
  hintText: string | undefined,
): string | undefined {
  return errorMessage ?? hintText;
}

export function getHelperVariant(
  errorMessage: string | undefined,
): "error" | "hint" {
  return errorMessage ? "error" : "hint";
}
