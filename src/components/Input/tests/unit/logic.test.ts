import { describe, test, expect } from "vitest";
import {
  resolveInputType,
  hasInputError,
  getAriaDescribedBy,
  getHelperId,
  getHelperContent,
  getHelperVariant,
  getToggleAriaLabel,
  saveCursorPosition,
} from "@/components/Input/logic";

describe("resolveInputType", () => {
  test("returns text when type is password and showPassword is true", () => {
    expect(resolveInputType("password", true)).toBe("text");
  });

  test("returns password when type is password and showPassword is false", () => {
    expect(resolveInputType("password", false)).toBe("password");
  });

  test("returns original type when type is not password", () => {
    expect(resolveInputType("email", true)).toBe("email");
    expect(resolveInputType("email", false)).toBe("email");
    expect(resolveInputType("text", true)).toBe("text");
  });
});

describe("hasInputError", () => {
  test("returns true when error is true", () => {
    expect(hasInputError(true, undefined)).toBe(true);
  });

  test("returns true when errorMessage is provided", () => {
    expect(hasInputError(false, "Error message")).toBe(true);
  });

  test("returns true when both error and errorMessage are provided", () => {
    expect(hasInputError(true, "Error message")).toBe(true);
  });

  test("returns false when no error", () => {
    expect(hasInputError(false, undefined)).toBe(false);
    expect(hasInputError(undefined, undefined)).toBe(false);
  });
});

describe("getAriaDescribedBy", () => {
  test("returns helper id when errorMessage is provided", () => {
    expect(getAriaDescribedBy("input-1", "Error", undefined)).toBe(
      "input-1-helper",
    );
  });

  test("returns helper id when hintText is provided", () => {
    expect(getAriaDescribedBy("input-1", undefined, "Hint")).toBe(
      "input-1-helper",
    );
  });

  test("returns undefined when no helper content", () => {
    expect(getAriaDescribedBy("input-1", undefined, undefined)).toBeUndefined();
  });
});

describe("getHelperId", () => {
  test("returns correct helper id", () => {
    expect(getHelperId("my-input")).toBe("my-input-helper");
  });
});

describe("getHelperContent", () => {
  test("returns errorMessage when provided", () => {
    expect(getHelperContent("Error", "Hint")).toBe("Error");
  });

  test("returns hintText when no errorMessage", () => {
    expect(getHelperContent(undefined, "Hint")).toBe("Hint");
  });

  test("returns undefined when neither provided", () => {
    expect(getHelperContent(undefined, undefined)).toBeUndefined();
  });
});

describe("getHelperVariant", () => {
  test("returns error when errorMessage is provided", () => {
    expect(getHelperVariant("Error")).toBe("error");
  });

  test("returns hint when no errorMessage", () => {
    expect(getHelperVariant(undefined)).toBe("hint");
  });
});

describe("getToggleAriaLabel", () => {
  test("returns Hide password when visible", () => {
    expect(getToggleAriaLabel(true)).toBe("Hide password");
  });

  test("returns Show password when hidden", () => {
    expect(getToggleAriaLabel(false)).toBe("Show password");
  });
});

describe("saveCursorPosition", () => {
  test("returns null values when input is null", () => {
    expect(saveCursorPosition(null)).toEqual({
      selectionStart: null,
      selectionEnd: null,
    });
  });

  test("returns cursor position from input", () => {
    const mockInput = {
      selectionStart: 5,
      selectionEnd: 10,
    } as HTMLInputElement;

    expect(saveCursorPosition(mockInput)).toEqual({
      selectionStart: 5,
      selectionEnd: 10,
    });
  });
});
