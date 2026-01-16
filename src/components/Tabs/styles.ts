import { cva } from "class-variance-authority";

export const tabsListStyles = cva([
  "flex",
  "w-full",
  "overflow-x-scroll",
  "[&::-webkit-scrollbar]:hidden",
  "[-ms-overflow-style:none]",
  "[scrollbar-width:none]",
]);

export const tabsTriggerStyles = cva(
  [
    "text-sm",
    "leading-5",
    "w-full",
    "min-w-fit",
    "px-4",
    "py-2",
    "md:py-4",
    "border-b",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-blue-500",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ],
  {
    variants: {
      active: {
        true: [
          "border-b-2",
          "border-blue-600",
          "text-blue-600",
          "font-semibold",
        ],
        false: ["border-gray-300", "text-gray-600", "font-normal"],
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const tabsContentStyles = cva([
  "w-full",
  "outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-blue-500",
]);
