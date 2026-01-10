import type { SelectHTMLAttributes, Ref, ReactNode } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  content?: ReactNode;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  ref?: Ref<HTMLSelectElement>;

  name: string;

  label: string;

  hideLabel?: boolean;

  errorMessage?: string;

  hintText?: string;

  error?: boolean;

  options: SelectOption[];

  placeholder?: string;
}
