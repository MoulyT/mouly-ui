import type { VariantProps } from "class-variance-authority";
import type { iconStyles } from "./styles";

export interface IconProps extends VariantProps<typeof iconStyles> {
  /**
   * The SVG component to render as the icon
   */
  component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  /**
   * Whether the icon should be hidden from assistive technologies
   * @default true
   */
  ariaHidden?: boolean;

  /**
   * Additional CSS classes to apply
   */
  className?: string;
}
