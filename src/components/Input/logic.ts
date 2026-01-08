export function resolveInputType(type: string, showPassword: boolean): string {
  if (type === "password" && showPassword) {
    return "text";
  }
  return type;
}

export function hasInputError(
  error: boolean | undefined,
  errorMessage: string | undefined,
): boolean {
  return error === true || !!errorMessage;
}

export function getAriaDescribedBy(
  inputId: string,
  errorMessage: string | undefined,
  hintText: string | undefined,
): string | undefined {
  if (errorMessage || hintText) {
    return `${inputId}-helper`;
  }
  return undefined;
}

export function getHelperId(inputId: string): string {
  return `${inputId}-helper`;
}

export function getHelperContent(
  errorMessage: string | undefined,
  hintText: string | undefined,
): string | undefined {
  return errorMessage || hintText;
}

export function getHelperVariant(
  errorMessage: string | undefined,
): "error" | "hint" {
  return errorMessage ? "error" : "hint";
}

export function getToggleAriaLabel(showPassword: boolean): string {
  return showPassword ? "Hide password" : "Show password";
}

export interface CursorPosition {
  selectionStart: number | null;
  selectionEnd: number | null;
}

export function saveCursorPosition(
  input: HTMLInputElement | null,
): CursorPosition {
  if (!input) {
    return { selectionStart: null, selectionEnd: null };
  }
  return {
    selectionStart: input.selectionStart,
    selectionEnd: input.selectionEnd,
  };
}

export function restoreCursorPosition(
  input: HTMLInputElement | null,
  position: CursorPosition,
): void {
  if (!input || document.activeElement !== input) {
    return;
  }
  if (position.selectionStart !== null) {
    input.selectionStart = position.selectionStart;
  }
  if (position.selectionEnd !== null) {
    input.selectionEnd = position.selectionEnd;
  }
}

export function togglePasswordWithCursorRestore(
  input: HTMLInputElement | null,
  setShowPassword: (updater: (prev: boolean) => boolean) => void,
) {
  const cursorPosition = saveCursorPosition(input);
  setShowPassword((prev) => !prev);
  requestAnimationFrame(() => {
    restoreCursorPosition(input, cursorPosition);
  });
}
