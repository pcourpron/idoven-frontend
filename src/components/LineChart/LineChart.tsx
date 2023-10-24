import {
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  LineChart as RechartsLineChart,
  TooltipProps,
  XAxisProps,
  YAxisProps,
  Label,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { useZoom } from "./hooks/useZoom";
import { ChartData, ChartPoint } from "./types";
import { FC, useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

type LineChartProps<T = ChartData> = {
  data: T;
  width?: number;
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisProps?: Omit<XAxisProps, "label">;
  yAxisProps?: Omit<YAxisProps, "label">;
  chartTooltipProps?: TooltipProps<ChartPoint["x"], ChartPoint["y"]>;
  onChartClick?: CategoricalChartFunc;
  referenceLines?: {
    x: number;
    stroke?: string;
    value: string;
  }[];
};

export const LineChart: FC<LineChartProps> = ({
  data,
  width,
  height,
  xAxisLabel,
  xAxisProps,
  yAxisProps,
  yAxisLabel,
  chartTooltipProps,
  onChartClick,
  referenceLines,
}) => {
  const { chartFunctions, refArea, xDomain, resetZoom, isZoomed } =
    useZoom(data);

  const [hasDragged, setHasDragged] = useState(false);
  const [hasMouseDown, setHasMouseDown] = useState(false);

  return (
    <Box>
      <Tooltip title="Click and drag on the chart to zoom in.">
        <Box width="fit-content">
          <Button disabled={!isZoomed} onClick={resetZoom}>
            Reset zoom
          </Button>
        </Box>
      </Tooltip>
      <RechartsLineChart
        width={width}
        height={height}
        {...chartFunctions}
        data={data}
        onMouseDown={(prop1, prop2) => {
          chartFunctions.onMouseDown(prop1, prop2);
          setHasMouseDown(true);
        }}
        onMouseMove={(prop1, prop2) => {
          if (hasMouseDown) {
            setHasDragged(true);
          }
          chartFunctions.onMouseMove(prop1, prop2);
        }}
        onClick={(prop1, prop2) => {
          if (!hasDragged) {
            onChartClick?.(prop1, prop2);
          }
          setHasDragged(false);
          setHasMouseDown(false);
        }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Line
          strokeLinejoin="round"
          dot={false}
          strokeWidth={2}
          type="monotone"
          isAnimationActive={false}
          dataKey="y"
          stroke="#8884d8"
        />
        {referenceLines?.map(({ x, stroke = "red", value }) => (
          <ReferenceLine x={x} stroke={stroke} key={x}>
            <Label position="insideTop">{value}</Label>
          </ReferenceLine>
        ))}
        {refArea}

        <XAxis
          domain={xDomain}
          allowDataOverflow
          dataKey="x"
          type="number"
          {...xAxisProps}
        >
          {xAxisLabel && (
            <Label position="inside" style={{ textAnchor: "middle" }}>
              {xAxisLabel}
            </Label>
          )}
        </XAxis>
        <YAxis dataKey="y" {...yAxisProps}>
          {yAxisLabel && (
            <Label
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: "middle" }}
            >
              {yAxisLabel}
            </Label>
          )}
        </YAxis>

        <RechartsTooltip {...chartTooltipProps} />
      </RechartsLineChart>
    </Box>
  );
};
