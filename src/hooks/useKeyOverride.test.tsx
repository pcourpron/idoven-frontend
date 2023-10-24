import { render, waitFor } from "@testing-library/react";
import { useKeyOverride } from "./useKeyOverride";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

const TestComponent = ({
  callback,
  override,
}: {
  callback(): void;
  override: string;
}) => {
  useKeyOverride(override, callback);

  return <div />;
};

describe("useKeyOverride", () => {
  it("should call the callback when the key is pressed", async () => {
    const mockCallback = vi.fn();
    render(<TestComponent callback={mockCallback} override="ArrowLeft" />);

    userEvent.type(document.body, "{ArrowLeft}");

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });
});
