import {
  FC,
  ReactNode,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { EcgContext, useFileUploadsContext } from "..";
const CHUNK_SIZE = 200 * 1024;

export const EcgContextProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const { currentFile: file } = useFileUploadsContext();
  const [ecgValues, setEcgValues] =
    useState<{ timestamp: number; value: number }[]>();

  const [offset, setOffset] = useState<number>(0);

  const fileReader = useMemo(() => {
    const reader = new FileReader();

    reader.onload = function () {
      let values: {
        timestamp: number;
        value: number;
      }[] = [];
      const result = reader.result as ArrayBuffer;
      const buffer = new Uint8Array(result);
      const snippet = new TextDecoder("utf-8").decode(buffer);

      const pattern = /^(\d+\.\d+),(-?\d+\.\d+)/gm;

      let match;

      while ((match = pattern.exec(snippet))) {
        const timestamp = Number(match[1]);
        const value = Number(match[2]);

        if (timestamp - values[values.length - 1]?.timestamp > 0.004) {
          values.splice(values.length - 1, 1);
          values.push({
            timestamp: Number(match[1]) - 0.004,
            value: Number(match[2]),
          });
        }

        if (
          !isNaN(timestamp) &&
          !isNaN(value) &&
          timestamp > (values[values.length - 1]?.timestamp ?? -1)
        ) {
          values.push({
            timestamp: Number(match[1]),
            value: Number(match[2]),
          });
        }
      }
      setEcgValues(values);
      values = [];
    };

    return reader;
  }, []);

  const totalSplit = file?.size ? Math.ceil(file?.size / CHUNK_SIZE) - 1 : 0;

  const onSplitChange = useCallback(
    (value: number) => {
      setOffset(value);
      const start = value * CHUNK_SIZE;
      const end = start + CHUNK_SIZE;

      const slicedFile = file!.slice(start, end);

      fileReader.abort();
      fileReader.readAsArrayBuffer(slicedFile);
    },
    [fileReader, file]
  );

  const nextPage = useCallback(() => {
    const newOffset = offset - 1;
    if (newOffset < 0) {
      return;
    }
    setOffset(newOffset);
    onSplitChange(newOffset);
  }, [offset, onSplitChange]);

  const previousPage = useCallback(() => {
    const newOffset = offset + 1;
    if (newOffset > totalSplit) {
      return;
    }
    setOffset(newOffset);
    onSplitChange(newOffset);
  }, [offset, onSplitChange, totalSplit]);

  useEffect(() => {
    if (file) {
      onSplitChange(0);
    }
  }, [file, onSplitChange]);

  const value = useMemo(() => {
    if (!ecgValues) {
      return {
        loading: true,
        data: undefined,
        page: offset,
        setPage: onSplitChange,
        nextPage,
        previousPage,
        totalSplit,
      } as const;
    }
    return {
      loading: false,
      data: ecgValues,
      page: offset,
      setPage: onSplitChange,
      nextPage,
      previousPage,
      totalSplit,
    } as const;
  }, [ecgValues, offset, onSplitChange, nextPage, previousPage, totalSplit]);

  return <EcgContext.Provider value={value}>{children}</EcgContext.Provider>;
};
