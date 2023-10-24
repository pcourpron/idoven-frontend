import { act, renderHook } from "@testing-library/react";
import { useZoom } from "./useZoom";

describe("useZoom", () => {
  it("should return expected shape", () => {
    const initialData = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const { result } = renderHook(useZoom, { initialProps: initialData });

    expect(result.current.chartFunctions).toBeDefined();
    expect(result.current.refArea).toBeUndefined();
    expect(result.current.xDomain).toBeDefined();
    expect(result.current.resetZoom).toBeDefined();
    expect(result.current.isZoomed).toBeDefined();
    expect(result.current.isZooming).toBeDefined();
  });
  it("should return expected values", () => {
    const initialData = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const { result } = renderHook(useZoom, { initialProps: initialData });

    expect(result.current.refArea).toBeUndefined();
    expect(result.current.xDomain).toEqual([1, 2]);
    expect(result.current.isZooming).toEqual(false);
    expect(result.current.isZoomed).toEqual(false);
  });
  it("should return expected values during zooming", () => {
    const initialData = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    const { result } = renderHook(useZoom, {
      initialProps: initialData,
    });

    act(() => {
      result.current.chartFunctions.onMouseDown(
        { activeTooltipIndex: 0, activePayload: [{ payload: { x: 1 } }] },
        undefined
      );
    });
    act(() => {
      result.current.chartFunctions.onMouseMove(
        { activeTooltipIndex: 1, activePayload: [{ payload: { x: 2 } }] },
        undefined
      );
    });

    expect(result.current.refArea).toBeDefined();
    expect(result.current.xDomain).toEqual([1, 2]);
    expect(result.current.isZooming).toEqual(true);

    act(() => {
      result.current.chartFunctions.onMouseUp({}, undefined);
    });

    expect(result.current.refArea).toBeUndefined();
    expect(result.current.xDomain).toEqual([1, 2]);
    expect(result.current.isZooming).toEqual(false);
    expect(result.current.isZoomed).toBe(false);
  });

  it("should handle zooming in when minimum is reached", () => {
    const initialData = new Array(1000).fill(0).map((_, index) => ({
      x: index,
      y: index,
    }));
    const { result } = renderHook(useZoom, {
      initialProps: initialData,
    });

    act(() => {
      result.current.chartFunctions.onMouseDown(
        { activeTooltipIndex: 0, activePayload: [{ payload: { x: 1 } }] },
        undefined
      );
    });
    act(() => {
      result.current.chartFunctions.onMouseMove(
        { activeTooltipIndex: 500, activePayload: [{ payload: { x: 500 } }] },
        undefined
      );
    });

    expect(result.current.refArea).toBeDefined();
    expect(result.current.xDomain).toEqual([0, 999]);
    expect(result.current.isZooming).toEqual(true);

    act(() => {
      result.current.chartFunctions.onMouseUp({}, undefined);
    });

    expect(result.current.refArea).toBeUndefined();
    expect(result.current.xDomain).toEqual([1, 500]);
    expect(result.current.isZooming).toEqual(false);
    expect(result.current.isZoomed).toBe(true);
  });
});
