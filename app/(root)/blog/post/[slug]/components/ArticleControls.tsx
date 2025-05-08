import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Container, IconButton, Stack, Typography } from "@mui/material";

export default function ArticleControls() {
  return (
    <Container maxWidth="lg">
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <IconButton sx={{ border: "1px solid", borderColor: "grey.600" }}>
            <ArrowBackIosNew />
          </IconButton>
          <Typography sx={{ textDecoration: "underline" }}>
            Vorheriger
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Typography sx={{ textDecoration: "underline" }}>Nächster</Typography>
          <IconButton sx={{ border: "1px solid", borderColor: "grey.600" }}>
            <ArrowForwardIos />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  );
}
