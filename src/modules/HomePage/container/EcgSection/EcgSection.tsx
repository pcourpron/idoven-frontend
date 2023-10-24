import { EcgChart } from "../../component/EcgChart/EcgChart";
import { useNotesContext } from "../../../../context/hooks/useNotesContext";
import { useEcgContext, useFileUploadsContext } from "../../../../context";
import { useKeyOverride } from "../../../../hooks/useKeyOverride";
import { Box, Loader, Typography, UploadFile } from "../../../../components";

export const EcgSection = () => {
  const { data, totalSplit, setPage, page, nextPage, previousPage } =
    useEcgContext();
  const { setCurrentFile } = useFileUploadsContext();
  const { notes, addNote } = useNotesContext();

  useKeyOverride("ArrowLeft", nextPage);
  useKeyOverride("ArrowRight", previousPage);

  if (!data)
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

  return (
    <Box>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        marginBottom={5}
      >
        <Box>
          <Typography variant="h5"> Welcome to the ECG File reader!</Typography>
          <Typography variant="body1">
            Use the left and right arrow keys to navigate through the file or
            use the slider below.
          </Typography>
          <Typography variant="body1">
            You can add notes by clicking on the chart.
          </Typography>
          <Typography variant="body1">
            You can also zoom in by click and dragging on the chart.
          </Typography>
        </Box>
        <Box>
          <UploadFile
            text="Upload a new file here"
            onDrop={(acceptedFiles) => {
              setCurrentFile(acceptedFiles[0]);
            }}
          />
        </Box>
      </Box>
      {data.length === 0 ? (
        <Typography variant="body1">
          Looks like that file is invalid. Could you please upload another?
        </Typography>
      ) : (
        <EcgChart
          split={page}
          totalSplit={totalSplit}
          data={data}
          onSplitChange={setPage}
          notes={notes}
          addNote={addNote}
        />
      )}
    </Box>
  );
};
