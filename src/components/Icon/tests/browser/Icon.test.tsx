import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Icon } from "@/components/Icon";

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    data-testid="mock-icon"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

test("Icon renders the provided SVG component", async () => {
  const screen = await render(<Icon component={MockIcon} />);

  const svg = screen.getByTestId("mock-icon");
  await expect.element(svg).toBeVisible();
});

test("Icon sets aria-hidden to true by default", async () => {
  const screen = await render(<Icon component={MockIcon} />);

  const svg = screen.getByTestId("mock-icon");
  await expect.element(svg).toHaveAttribute("aria-hidden", "true");
});

test("Icon sets aria-hidden to false when specified", async () => {
  const screen = await render(<Icon component={MockIcon} ariaHidden={false} />);

  const svg = screen.getByTestId("mock-icon");
  await expect.element(svg).toHaveAttribute("aria-hidden", "false");
});

test("Icon renders within a wrapper element", async () => {
  const screen = await render(<Icon component={MockIcon} />);

  const svg = screen.getByTestId("mock-icon");
  await expect.element(svg).toBeVisible();

  // Verify the SVG is wrapped in a div
  await expect
    .poll(() => {
      const svgElement = document.querySelector('[data-testid="mock-icon"]');
      return svgElement?.parentElement?.tagName;
    })
    .toBe("DIV");
});

test("Icon renders with different size props without error", async () => {
  const sizes = ["xs", "s", "m", "l", "xl"] as const;

  for (const size of sizes) {
    const screen = await render(<Icon component={MockIcon} size={size} />);
    const svg = screen.getByTestId("mock-icon");
    await expect.element(svg).toBeVisible();
    screen.unmount();
  }
});

test("Icon wrapper receives custom className", async () => {
  await render(<Icon component={MockIcon} className="custom-icon-class" />);

  await expect
    .poll(() => {
      const wrapper = document.querySelector(".custom-icon-class");
      return wrapper !== null;
    })
    .toBe(true);
});

test("Icon SVG fills the wrapper container", async () => {
  await render(<Icon component={MockIcon} />);

  await expect
    .poll(() => {
      const svgElement = document.querySelector('[data-testid="mock-icon"]');
      const wrapper = svgElement?.parentElement;
      // Check that the wrapper has the [&>svg]:size-full style
      return wrapper?.classList.contains("[&>svg]:size-full");
    })
    .toBe(true);
});
