import { AccordionRoot as Root } from "./Root";
import { AccordionItem as Item } from "./Item";
import { AccordionTrigger as Trigger } from "./Trigger";
import { AccordionContent as Content } from "./Content";
import { AccordionIcon as Icon } from "./Icon";

export const Accordion = {
  Root,
  Item,
  Trigger,
  Content,
  Icon,
} as const;

export { Root as AccordionRoot };
export { Item as AccordionItem };
export { Trigger as AccordionTrigger };
export { Content as AccordionContent };
export { Icon as AccordionIcon };

export type * from "./types";
