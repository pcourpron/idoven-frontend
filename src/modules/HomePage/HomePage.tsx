import { useFileUploadsContext } from "../../context/hooks/useFileUploadsContext";
import { EcgSection } from "./container/EcgSection/EcgSection";
import { Box, UploadFile } from "../../components";

export const HomePage = () => {
  const { setCurrentFile, currentFile } = useFileUploadsContext();

  return currentFile ? (
    <Box paddingX={10}>
      <EcgSection />
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 100px)"
    >
      <UploadFile
        onDrop={(acceptedFiles) => {
          setCurrentFile(acceptedFiles[0]);
        }}
      />
    </Box>
  );
};
