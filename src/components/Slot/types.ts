import type { HTMLAttributes, ReactNode, Ref } from "react";

export type SlotProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
};

export type SlottableProps = {
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler = (...args: any[]) => any;
