import { cva } from "class-variance-authority";

export const checkboxContainerStyles = cva(
  "group relative flex cursor-pointer items-start gap-3 py-2 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-40",
);

export const checkboxBoxStyles = cva(
  [
    "pointer-events-none inline-flex size-5 shrink-0 items-center justify-center",
    "rounded border-2 bg-white transition-colors",
    "group-hover:bg-gray-50",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
    "peer-checked:border-0 peer-checked:bg-blue-600 group-hover:peer-checked:bg-blue-700",
    "peer-disabled:pointer-events-none",
  ],
  {
    variants: {
      hasError: {
        true: "border-red-500",
        false: "border-gray-300",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

export const checkboxLabelStyles = cva(
  "text-sm font-medium text-gray-900 select-none",
  {
    variants: {
      hidden: {
        true: "sr-only",
        false: "",
      },
    },
    defaultVariants: {
      hidden: false,
    },
  },
);

export const checkboxHelperStyles = cva("mt-1 text-sm", {
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
