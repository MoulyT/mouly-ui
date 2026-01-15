import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";

export interface AccordionContextValue {
  value: string[];
  onItemOpen: (value: string) => void;
  onItemClose: (value: string) => void;
  disabled?: boolean;
  collapsible: boolean;
  registerTrigger: (value: string, ref: HTMLButtonElement | null) => void;
}

export interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  toggle: () => void;
  disabled?: boolean;
  triggerId: string;
  contentId: string;
}

export interface AccordionSingleProps {
  type: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  collapsible?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export interface AccordionMultipleProps {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export type AccordionRootProps = AccordionSingleProps | AccordionMultipleProps;

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

export interface AccordionIconProps {
  className?: string;
  ref?: Ref<SVGSVGElement>;
}
