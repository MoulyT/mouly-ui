import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Switch } from "@/components/Switch";

test("Switch renders with role='switch' for accessibility", async () => {
  const screen = await render(
    <Switch name="test" label="Test" checked={false} onChange={() => {}} />,
  );

  const switchInput = screen.getByRole("switch");
  await expect.element(switchInput).toBeInTheDocument();
});
