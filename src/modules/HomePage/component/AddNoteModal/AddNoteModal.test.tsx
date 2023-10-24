import { vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddNoteModal } from "./AddNoteModal";
import { secondsToHMS } from "../../../../utils";

describe("AddNoteModal", () => {
  it("should add note correctly with both submit types", async () => {
    const timestamp = 36000;
    const mockOnClose = vi.fn();
    const mockAddNote = vi.fn();
    const content = "test note";

    render(
      <AddNoteModal
        timestamp={timestamp}
        onClose={mockOnClose}
        onSubmit={mockAddNote}
      />
    );
    expect(mockAddNote).not.toHaveBeenCalled();

    expect(
      screen.getByText(secondsToHMS(timestamp), { exact: false })
    ).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    userEvent.click(input);
    userEvent.type(input, content);

    await waitFor(() => {
      expect(input).toHaveValue(content);
    });
    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockAddNote).toHaveBeenCalledWith({
        id: expect.any(String),
        timestamp,
        content,
      });
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    vi.clearAllMocks();
    userEvent.type(input, "{enter}");
    await waitFor(() => {
      expect(mockAddNote).toHaveBeenCalledWith({
        id: expect.any(String),
        timestamp,
        content,
      });
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
