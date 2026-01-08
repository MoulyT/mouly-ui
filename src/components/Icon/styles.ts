import { cva } from "class-variance-authority";

export const iconStyles = cva(
  "flex shrink-0 items-center justify-center [&>svg]:size-full",
  {
    variants: {
      size: {
        xs: ["size-3"],
        s: ["size-4"],
        m: ["size-5"],
        l: ["size-6"],
        xl: ["size-12"],
      },
    },
    defaultVariants: {
      size: "m",
    },
  },
);
