import { cva } from "class-variance-authority";

export const tagStyles = cva(
  "inline-flex w-fit items-center rounded px-2 py-0.5 text-sm font-medium",
  {
    variants: {
      variant: {
        primary: ["bg-blue-100", "text-blue-800"],
        secondary: ["bg-gray-100", "text-gray-800"],
        success: ["bg-green-100", "text-green-800"],
        warning: ["bg-amber-100", "text-amber-800"],
        danger: ["bg-red-100", "text-red-800"],
        outline: [
          "border",
          "border-blue-600",
          "text-blue-600",
          "bg-transparent",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);
