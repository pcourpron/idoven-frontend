import { renderHook } from "@testing-library/react-hooks";
import { useEcgContext } from ".";
import { useFileUploadsContext } from ".";
import { useNotesContext } from ".";

describe("Context hooks", () => {
  it.each([useEcgContext, useFileUploadsContext, useNotesContext])(
    " should throw error when rendered outside provider",
    (hook) => {
      const { result } = renderHook(() => hook());
      expect(result.error).toBeDefined();
    }
  );
});
