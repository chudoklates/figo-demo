import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { PageContainer } from "..";

export default function Loading() {
  return (
    <PageContainer>
      <Stack
        sx={{
          alignItems: "center",
          pb: 12,
        }}
      >
        <CircularProgress size={150} color="primary" />
      </Stack>
    </PageContainer>
  );
}
