import { cva } from "class-variance-authority";

export const selectContainerStyles = cva(
  "flex flex-col gap-1.5 has-[select:disabled]:opacity-40",
);

export const selectLabelStyles = cva("text-sm font-medium text-gray-900", {
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

export const selectWrapperStyles = cva(
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

const baseStyles = [
  "h-11 w-full rounded-md bg-transparent px-3 py-2",
  "text-base text-gray-900",
  "outline-none",
  "disabled:cursor-not-allowed",
  "[appearance:base-select]",
];

const pickerDropdownStyles = [
  "[&::picker(select)]:mt-1",
  "[&::picker(select)]:rounded-md",
  "[&::picker(select)]:border",
  "[&::picker(select)]:border-gray-200",
  "[&::picker(select)]:bg-white",
  "[&::picker(select)]:shadow-lg",
  "[&::picker(select)]:p-1",
];

const pickerIconStyles: string[] = [];

const optionStyles = [
  "[&_option]:px-3",
  "[&_option]:py-2",
  "[&_option]:rounded",
  "[&_option:hover]:bg-gray-100",
  "[&_option:checked]:bg-blue-50",
  "[&_option:checked]:text-blue-900",
];

const checkmarkStyles = ["[&_option::checkmark]:text-blue-600"];

export const selectStyles = cva([
  ...baseStyles,
  ...pickerDropdownStyles,
  ...pickerIconStyles,
  ...optionStyles,
  ...checkmarkStyles,
]);

export const selectHelperStyles = cva("text-sm", {
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
