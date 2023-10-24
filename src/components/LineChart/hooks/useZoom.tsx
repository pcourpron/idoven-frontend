import { useState, useCallback, useEffect } from "react";
import { ReferenceArea } from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import { ChartData } from "../types";

export const useZoom = (data: ChartData, minZoomWidth = 100) => {
  const [leftRefArea, setLeftRefArea] = useState<{
    index: number;
    value: number;
  }>();
  const [rightRefArea, setRightRefArea] = useState<{
    index: number;
    value: number;
  }>();

  const [isZooming, setIsZooming] = useState<boolean>(false);

  const [xDomain, setXDomain] = useState<[number, number]>([
    data[0]?.x,
    data[data.length - 1]?.x,
  ]);

  const onMouseDown: CategoricalChartFunc = (e) => {
    setIsZooming(true);
    setLeftRefArea({
      index: e.activeTooltipIndex ?? 0,
      value: e.activePayload?.[0]?.payload?.x ?? 0,
    });

    setRightRefArea({
      index: e.activeTooltipIndex ?? 0,
      value: e.activePayload?.[0]?.payload?.x ?? 0,
    });
  };

  const onMouseMove: CategoricalChartFunc = (e) => {
    if (isZooming) {
      const index = e.activeTooltipIndex ?? undefined;
      const hasReachedMinWidth =
        Math.abs((index ?? 0) - (leftRefArea?.index ?? 0)) > minZoomWidth;
      if (hasReachedMinWidth) {
        setRightRefArea({
          index: index ?? 0,
          value: index ? e.activePayload?.[0]?.payload?.x : 0,
        });
      } else {
        setRightRefArea(leftRefArea);
      }
    }
  };
  const onMouseUp: CategoricalChartFunc = () => {
    setIsZooming(false);
    const leftAreaValue = leftRefArea?.value ?? 0;
    const rightAreaValue = rightRefArea?.value ?? 0;
    if (leftAreaValue !== rightAreaValue) {
      const flip = leftAreaValue > rightAreaValue;
      setXDomain([
        flip ? rightAreaValue : leftAreaValue,
        flip ? leftAreaValue : rightAreaValue,
      ]);
    }
  };

  const resetZoom = useCallback(() => {
    setLeftRefArea(undefined);
    setRightRefArea(undefined);
    setXDomain([data[0]?.x, data[data.length - 1]?.x]);
  }, [data]);

  useEffect(() => {
    resetZoom();
  }, [resetZoom]);

  return {
    chartFunctions: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
    },
    refArea: isZooming ? (
      <ReferenceArea
        x1={leftRefArea?.value}
        x2={rightRefArea?.value}
        strokeOpacity={0.3}
      />
    ) : undefined,
    isZooming,
    xDomain,
    resetZoom,
    isZoomed:
      xDomain[0] !== data[0]?.x || xDomain[1] !== data[data.length - 1]?.x,
  };
};
