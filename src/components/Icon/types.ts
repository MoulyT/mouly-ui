import type { VariantProps } from "class-variance-authority";
import type { iconStyles } from "./styles";

export interface IconProps extends VariantProps<typeof iconStyles> {
  /**
   * The SVG component to render as the icon.
   */
  component: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  /**
   * When true, hides the icon from assistive technologies.
   * Set to false if the icon conveys meaning.
   * @default true
   */
  ariaHidden?: boolean;

  /**
   * Additional CSS classes to apply to the icon wrapper.
   */
  className?: string;
}
