import JSZip from "jszip";
import { useFileUploadsContext } from "../../context/hooks/useFileUploadsContext";
import { EcgSection } from "./container/EcgSection/EcgSection";
import { Box, Button, Snackbar, UploadFile, Loader } from "../../components";
import { useState } from "react";

export const HomePage = () => {
  const { setCurrentFile, currentFile } = useFileUploadsContext();
  const [loading, setLoading] = useState<boolean>(false);

  if (loading)
    return (
      <Box
        sx={{
          height: "calc(100vh - 100px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader text="Data is loading..." />
      </Box>
    );

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
        onClick={async () => {
          setLoading(true);
          await handleZipFileDownload({
            onSuccess: setCurrentFile,
            onFailure: () => {},
          });
          setLoading(false);
        }}
      >
        Download the demo file
      </Button>
      <Snackbar message="Something went wrong while downloading the demo file" />
    </Box>
  );
};

const handleZipFileDownload = async ({
  onSuccess,
  onFailure,
}: {
  onSuccess: (file: File) => void;
  onFailure: () => void;
}) => {
  try {
    const zipFile = await fetch("demo/data.zip");
    const blob = await zipFile.blob();

    const zipReader = new JSZip();

    await zipReader.loadAsync(blob);

    const fileName = Object.keys(zipReader.files)[0];

    const fileBlob = await zipReader.file(fileName)?.async("blob");

    if (fileBlob) {
      const file = new File([fileBlob], fileName);
      onSuccess(file);
      return;
    }
    onFailure();
  } catch {
    onFailure();
  }
};
