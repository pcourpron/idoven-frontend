import { render, screen } from "@testing-library/react";
import { Notes } from ".";
import { vi } from "vitest";

const mockUseNotesContext = vi.fn().mockReturnValue({
  notes: [],
});

vi.mock("../../context", () => ({
  useNotesContext: () => mockUseNotesContext(),
}));

describe("Notes", () => {
  it("should render correctly on empty notes", () => {
    render(<Notes />);
    expect(
      screen.getByText("Come back when you've added some notes!")
    ).toBeInTheDocument();
  });
  it("should render list correctly", () => {
    mockUseNotesContext.mockReturnValue({
      notes: [
        {
          id: "1",
          content: "test",
          timestamp: "2021-10-10",
        },
      ],
    });
    render(<Notes />);
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("2021-10-10")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Note")).toBeInTheDocument();
  });
});
