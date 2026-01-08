import { cva } from "class-variance-authority";

export const inputContainerStyles = cva(
  "flex flex-col gap-1.5 has-[input:disabled]:opacity-40",
);

export const inputLabelStyles = cva("text-sm font-medium text-gray-900", {
  variants: {
    hidden: {
      true: "sr-only",
      false: "",
    },
  },
  defaultVariants: {
    hidden: false,
  },
});

export const inputWrapperStyles = cva(
  [
    "flex items-center gap-2 rounded-md border bg-white",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-1",
    "transition-colors",
  ],
  {
    variants: {
      hasError: {
        true: [
          "border-red-500",
          "focus-within:border-red-500 focus-within:ring-red-200",
        ],
        false: [
          "border-gray-300",
          "focus-within:border-blue-500 focus-within:ring-blue-200",
        ],
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

export const inputStyles = cva([
  "h-11 w-full rounded-md bg-transparent px-3 py-2",
  "text-base text-gray-900 placeholder:text-gray-400",
  "outline-none",
  "disabled:cursor-not-allowed",
]);

export const inputHelperStyles = cva("text-sm", {
  variants: {
    variant: {
      error: "text-red-600",
      hint: "text-gray-500",
    },
  },
  defaultVariants: {
    variant: "hint",
  },
});
