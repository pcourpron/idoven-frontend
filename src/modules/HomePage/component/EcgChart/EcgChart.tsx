import { EcgData } from "../../../../types/EcgData.types";
import { Box, Slider } from "@mui/material";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { LineChart } from "../../../../components";
import { secondsToHMS } from "../../../../utils";
import { AddNoteModal } from "../AddNoteModal/AddNoteModal";
import { Note } from "../../../../context/NotesContext/NotesContext";

export const EcgChart = ({
  data,
  totalSplit,
  onSplitChange,
  split,
  notes,
  addNote,
}: {
  data: EcgData[];
  totalSplit: number;
  onSplitChange: (value: number) => void;
  split: number;
  notes?: Note[];
  addNote: (note: Note) => void;
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const divWidth = useElementWidth(chartContainerRef);

  const chartData = useMemo(
    () => data.map(({ value, timestamp }) => ({ x: timestamp, y: value })),
    [data]
  );
  const [selectedTimestamp, setSelectedTimeStamp] = useState<number | null>(
    null
  );

  return (
    <Box ref={chartContainerRef}>
      <LineChart
        data={chartData ?? []}
        height={divWidth / 3}
        width={divWidth}
        xAxisLabel="Time"
        yAxisLabel="Voltage"
        chartTooltipProps={{
          labelFormatter: (value) => secondsToHMS(value),
          formatter: (value) => `${value} uV`,
        }}
        xAxisProps={{
          tickFormatter: (value) => secondsToHMS(value),
          height: 80,
        }}
        yAxisProps={{
          tickFormatter: (value) => `${value} uV`,
          width: 80,
        }}
        onChartClick={(e) => {
          setSelectedTimeStamp(e.activePayload?.[0].payload.x ?? null);
        }}
        referenceLines={notes?.map(({ timestamp, content }) => ({
          x: timestamp,
          value: content,
          stroke: "red",
        }))}
      />

      {selectedTimestamp && (
        <AddNoteModal
          onSubmit={addNote}
          timestamp={selectedTimestamp}
          onClose={() => setSelectedTimeStamp(null)}
        />
      )}
      <Slider
        valueLabelDisplay="on"
        aria-label="Time"
        defaultValue={0}
        value={split}
        marks
        onChange={(_, value) => {
          onSplitChange(value as number);
        }}
        min={0}
        max={totalSplit}
      />
      {}
    </Box>
  );
};

const useElementWidth = (ref: RefObject<HTMLElement>) => {
  const [divWidth, setDivWidth] = useState<number>(0);

  useEffect(() => {
    // Check if the ref is available before accessing clientWidth
    if (ref.current) {
      // Access the clientWidth property of the DOM element
      const width = ref.current.clientWidth;
      setDivWidth(width);
    }
  }, [ref]);
  return divWidth;
};
