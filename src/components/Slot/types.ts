import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";

export type SlotProps<T extends HTMLElement = HTMLElement> =
  HTMLAttributes<T> & {
    children?: ReactNode;
    ref?: Ref<T>;
  };

export type SlottableProps = {
  children: ReactNode;
};

export type AnyElementProps = {
  ref?: Ref<unknown>;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
};

// Union instead of intersection to avoid `undefined & string = never`
export type MergedProps<S, C> = {
  [K in keyof S | keyof C]: K extends keyof C
    ? K extends keyof S
      ? S[K] | C[K]
      : C[K]
    : K extends keyof S
      ? S[K]
      : never;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler = (...args: any[]) => any;
