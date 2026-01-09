import { test, expect } from "vitest";
import { render } from "vitest-browser-react";
import { Textarea } from "@/components/Textarea";

test("Textarea connects label to textarea via htmlFor", async () => {
  const screen = await render(
    <Textarea name="description" label="Description" />,
  );

  const textarea = screen.getByRole("textbox");
  const label = screen.getByText("Description");

  const textareaId = textarea.element().getAttribute("id");
  expect(textareaId).toBeTruthy();

  await expect.element(label).toHaveAttribute("for", textareaId!);
});

test("Textarea forwards ref correctly", async () => {
  let textareaElement: HTMLTextAreaElement | null = null;

  await render(
    <Textarea
      name="test"
      label="Test"
      ref={(el) => {
        textareaElement = el;
      }}
    />,
  );

  expect(textareaElement).toBeInstanceOf(HTMLTextAreaElement);
});

test("Textarea links helper text with aria-describedby when present", async () => {
  const screen = await render(
    <Textarea name="test" label="Test" hintText="Hint text" />,
  );

  const textarea = screen.getByRole("textbox");
  const helperId = textarea.element().getAttribute("aria-describedby");

  expect(helperId).toBeTruthy();

  const helperText = screen.container.querySelector(`#${helperId}`);
  expect(helperText).not.toBeNull();
  expect(helperText?.textContent).toBe("Hint text");
});

test("Textarea sets aria-invalid when error is present", async () => {
  const screen = await render(
    <Textarea
      name="feedback"
      label="Feedback"
      errorMessage="This field is required"
    />,
  );

  const textarea = screen.getByRole("textbox");
  await expect.element(textarea).toHaveAttribute("aria-invalid", "true");
});

test("Textarea width does not grow beyond container with long placeholder", async () => {
  const screen = await render(
    <div style={{ width: "400px" }}>
      <Textarea
        name="test"
        label="Test"
        autoResize={true}
        placeholder="This is a very long placeholder text that should be much wider than the container if the textarea were allowed to grow horizontally beyond its parent width constraint"
      />
    </div>,
  );

  const container = screen.container.querySelector("div") as HTMLDivElement;
  const textarea = screen.getByRole("textbox");
  const textareaElement = textarea.element() as HTMLTextAreaElement;

  const containerWidth = container.offsetWidth;
  const textareaWidth = textareaElement.offsetWidth;

  expect(containerWidth).toBe(400);
  expect(textareaWidth).toBeLessThanOrEqual(containerWidth);

  await textarea.fill("a");

  expect(textareaElement.offsetWidth).toBe(textareaWidth);
});
