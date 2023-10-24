import { FC, ReactNode, useState } from "react";
import { FileUploadsContext } from "./FileUploadsContext";

export const FileUploadsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  return (
    <FileUploadsContext.Provider
      value={{
        currentFile,
        setCurrentFile,
      }}
    >
      {children}
    </FileUploadsContext.Provider>
  );
};
