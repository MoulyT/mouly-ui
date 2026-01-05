import type { PropsWithChildren, Ref } from "react";

export type SlotProps = PropsWithChildren & {
  ref?: Ref<HTMLElement>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler = (...args: any[]) => any;
