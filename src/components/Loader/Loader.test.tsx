import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader component", () => {
  test("renders without text", () => {
    render(<Loader />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();

    const textElement = screen.queryByTestId("loader-test-box");
    expect(textElement).not.toBeInTheDocument();
  });

  test("renders with text", () => {
    render(<Loader text="Data is loading..." />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();

    const loadedTextElement = screen.getByText("Data is loading...");
    expect(loadedTextElement).toBeInTheDocument();
  });
});
