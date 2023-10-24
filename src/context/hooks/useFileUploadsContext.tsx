import { useContext } from "react";
import { FileUploadsContext } from "../FileUploads/FileUploadsContext";

export const useFileUploadsContext = () => {
  const context = useContext(FileUploadsContext);
  if (!context) {
    throw new Error(
      "useFileUploadsContext must be used within a FileUploadsContextProvider"
    );
  }
  return context;
};
