import { AccordionSingle } from "./AccordionSingle";
import { AccordionMultiple } from "./AccordionMultiple";
import type { AccordionRootProps } from "./types";

export function AccordionRoot(props: AccordionRootProps) {
  if (props.type === "single") {
    return <AccordionSingle {...props} />;
  }
  return <AccordionMultiple {...props} />;
}
