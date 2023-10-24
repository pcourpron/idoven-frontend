import { createContext } from "react";

type EcgContextType =
  | {
      loading: true;
      data: undefined;
      page: number;
      setPage: (page: number) => void;
      nextPage: () => void;
      previousPage: () => void;
      totalSplit: number;
    }
  | {
      loading: false;
      data: { timestamp: number; value: number }[];
      page: number;
      setPage: (page: number) => void;
      nextPage: () => void;
      previousPage: () => void;
      totalSplit: number;
    };
export const EcgContext = createContext<EcgContextType | null>(null);
