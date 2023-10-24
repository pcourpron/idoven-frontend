import { useFileUploadsContext } from "../../context/hooks/useFileUploadsContext";
import { EcgSection } from "./container/EcgSection/EcgSection";
import { Box, Button, UploadFile } from "../../components";

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
      or
      <Button
        onClick={() =>
          fetch("demo/data.txt")
            .then(async (res) => res.blob())
            .then((res) => setCurrentFile(new File([res], "demo.txt")))
        }
      >
        Download the demo file
      </Button>
    </Box>
  );
};
