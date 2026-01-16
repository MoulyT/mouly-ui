import { TabsRoot as Root } from "./Root";
import { TabsList as List } from "./List";
import { TabsTrigger as Trigger } from "./Trigger";
import { TabsContent as Content } from "./Content";

export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
} as const;

export { Root as TabsRoot };
export { List as TabsList };
export { Trigger as TabsTrigger };
export { Content as TabsContent };

export type * from "./types";
