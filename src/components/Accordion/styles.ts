import { cva } from "class-variance-authority";

export const accordionItemStyles = cva([
  "flex",
  "flex-col",
  "rounded-[4px]",
  "border",
  "border-stone-300",
  "transition-colors",
  "has-[button:focus-visible]:border-gray-700",
  "has-[button:hover]:border-gray-700",
]);

export const accordionTriggerStyles = cva([
  "flex",
  "w-full",
  "cursor-pointer",
  "items-center",
  "justify-between",
  "p-6",
  "text-left",
  "text-[1.0625rem]",
  "leading-6",
  "font-semibold",
  "outline-none",
  "transition-colors",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
]);

export const accordionContentStyles = cva([
  "grid",
  "w-full",
  "px-6",
  "transition-all",
  "duration-200",
  "ease-out",
]);

export const accordionIconStyles = cva([
  "h-5",
  "w-5",
  "shrink-0",
  "transition-transform",
  "duration-200",
]);
