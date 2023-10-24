import { render, screen, waitFor } from "@testing-library/react";
import { UploadFile } from ".";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("UploadFile", () => {
  it("should render successfully", async () => {
    const mockOnDrop = vi.fn();
    const mockFile = new File([""], "test.txt");
    render(<UploadFile onDrop={mockOnDrop} />);

    expect(
      screen.getByText(
        "Drag 'n' drop some files here, or click to select files"
      )
    ).toBeInTheDocument();

    const uploadFileInput = screen.getByTestId("upload-file");

    userEvent.upload(uploadFileInput, mockFile);

    await waitFor(() => {
      expect(mockOnDrop).toHaveBeenCalledTimes(1);
    });

    expect(mockOnDrop.mock.calls[0][0][0]).toBe(mockFile);
  });
});
