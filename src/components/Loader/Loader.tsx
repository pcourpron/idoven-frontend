import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  text?: string;
}

export const Loader = ({ text }: LoaderProps) => {
  return (
    <Box display="flex" flexDirection="column">
      <CircularProgress sx={{ marginX: "auto" }} />
      {text && (
        <Box
          mt="20px"
          fontSize="20px"
          fontWeight="500"
          data-testid="loader-test-box"
        >
          <Typography variant="h6">{text}</Typography>
        </Box>
      )}
    </Box>
  );
};
