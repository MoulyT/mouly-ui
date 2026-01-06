import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "inline-flex w-fit items-center justify-center gap-2 rounded font-bold transition-all ease-in-out disabled:opacity-20 disabled:cursor-not-allowed focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary: [
          "text-white",
          "border-2 border-transparent",
          "bg-blue-600",
          "hover:bg-blue-700",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        ],
        secondary: [
          "text-gray-900",
          "border-2 border-transparent",
          "bg-gray-200",
          "hover:bg-gray-300",
          "focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
        ],
        outline: [
          "text-blue-600",
          "border-2 border-blue-600",
          "bg-transparent",
          "hover:bg-blue-50",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        ],
        ghost: [
          "text-blue-600",
          "border-2 border-transparent",
          "bg-transparent",
          "hover:bg-blue-50",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        ],
        destructive: [
          "text-white",
          "border-2 border-transparent",
          "bg-red-600",
          "hover:bg-red-700",
          "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
        ],
        link: [
          "text-blue-600",
          "underline-offset-4",
          "hover:underline",
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        ],
      },
      size: {
        sm: ["text-sm", "px-3 py-1.5"],
        md: ["text-base", "px-4 py-2"],
        lg: ["text-lg", "px-6 py-3"],
        icon: ["p-2"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
