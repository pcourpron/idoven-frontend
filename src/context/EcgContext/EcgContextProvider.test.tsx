import { render, renderHook, waitFor } from "@testing-library/react";
import { EcgContextProvider, useEcgContext } from "..";
import { FileUploadsContextProvider } from "../FileUploads/FileUploadsProvider";
import * as Ecg from "..";
import { vi } from "vitest";

const fileValue = `
0.004,8.0,9.0,10.0,11.0,12.0,
0.008,14.0,15.0,16.0,17.0,18.0,
`;

describe("EcgContextProvider", () => {
  it("should render successfully", () => {
    render(<EcgContextProvider />, { wrapper: FileUploadsContextProvider });
  });
  it("should parse file correctly", async () => {
    const mockFile = new File([fileValue], "test.txt");

    vi.spyOn(Ecg, "useFileUploadsContext").mockReturnValue({
      currentFile: mockFile,
      setCurrentFile: vi.fn(),
    });
    const { result } = renderHook(useEcgContext, {
      wrapper: EcgContextProvider,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([
        { timestamp: 0.004, value: 8 },
        { timestamp: 0.008, value: 14 },
      ]);
    });
  });
});
