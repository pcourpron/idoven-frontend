import { createContext } from "react";

type FileUploadsContextType = {
  setCurrentFile: (file: File) => void;
  currentFile: File | null;
};
export const FileUploadsContext = createContext<FileUploadsContextType | null>(
  null
);
