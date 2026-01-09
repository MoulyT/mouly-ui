import { cva } from "class-variance-authority";

export const textareaContainerStyles = cva(
  "flex flex-col gap-1.5 has-[textarea:disabled]:opacity-40",
);

export const textareaLabelStyles = cva("text-sm font-medium text-gray-900", {
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

export const textareaWrapperStyles = cva(
  [
    "flex w-full rounded-md border bg-white",
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

export const textareaStyles = cva([
  "min-h-[80px] w-full min-w-full resize-y rounded-md bg-transparent px-3 py-2",
  "text-base text-gray-900 placeholder:text-gray-400",
  "outline-none",
  "disabled:cursor-not-allowed disabled:resize-none",
  "[field-sizing:content]",
  "max-h-[400px]",
  "scrollbar-styled",
]);

export const textareaHelperStyles = cva("text-sm", {
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
