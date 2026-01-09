/**
 * Input-specific logic utilities.
 * For shared form logic, see @/components/shared/form-logic.ts
 */

export function resolveInputType(type: string, showPassword: boolean): string {
  if (type === "password" && showPassword) {
    return "text";
  }
  return type;
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
