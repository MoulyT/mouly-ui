import { cva } from "class-variance-authority";

export const switchContainerStyles = cva(
  "group relative flex cursor-pointer items-center gap-3 py-2 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-40",
);

export const switchTrackStyles = cva(
  [
    "pointer-events-none relative h-6 w-11 shrink-0 rounded-full transition-colors",
    "bg-gray-200",
    "group-hover:bg-gray-300",
    "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
    "peer-checked:bg-blue-600 group-hover:peer-checked:bg-blue-700",
    "peer-disabled:pointer-events-none",
    // Thumb via ::after pseudo-element
    "after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full",
    "after:bg-white after:shadow after:transition-transform after:content-['']",
    "peer-checked:after:translate-x-5",
  ],
  {
    variants: {
      hasError: {
        true: "ring-2 ring-red-500 ring-offset-1",
        false: "",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  },
);

export const switchLabelStyles = cva(
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

export const switchHelperStyles = cva("mt-1 text-sm", {
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
