import { describe, test, expect } from "vitest";
import {
  hasFieldError,
  getHelperId,
  getAriaDescribedBy,
  getHelperContent,
  getHelperVariant,
} from "../form-logic";

describe("hasFieldError", () => {
  test("returns true when error is true", () => {
    expect(hasFieldError(true, undefined)).toBe(true);
  });

  test("returns true when errorMessage is provided", () => {
    expect(hasFieldError(false, "Error")).toBe(true);
    expect(hasFieldError(undefined, "Error")).toBe(true);
  });

  test("returns false when no error indicators", () => {
    expect(hasFieldError(false, undefined)).toBe(false);
    expect(hasFieldError(undefined, undefined)).toBe(false);
    expect(hasFieldError(false, "")).toBe(false);
  });
});

describe("getHelperId", () => {
  test("appends -helper suffix to field id", () => {
    expect(getHelperId("email")).toBe("email-helper");
    expect(getHelperId("my-field")).toBe("my-field-helper");
  });
});

describe("getAriaDescribedBy", () => {
  test("returns helper id when errorMessage is provided", () => {
    expect(getAriaDescribedBy("email", "Error", undefined)).toBe(
      "email-helper",
    );
  });

  test("returns helper id when hintText is provided", () => {
    expect(getAriaDescribedBy("email", undefined, "Hint")).toBe("email-helper");
  });

  test("returns undefined when no helper content", () => {
    expect(getAriaDescribedBy("email", undefined, undefined)).toBeUndefined();
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
  test("returns 'error' when errorMessage is provided", () => {
    expect(getHelperVariant("Error")).toBe("error");
  });

  test("returns 'hint' when no errorMessage", () => {
    expect(getHelperVariant(undefined)).toBe("hint");
  });
});
