import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function NoSeats() {
  return (
    <Stack
      spacing={5}
      sx={{
        alignItems: "center",
        textAlign: "center",
        minWidth: { xs: "unset", md: 450 },
      }}
    >
      <Typography variant="h3">Oooopss...</Typography>
      <Box>
        <Typography variant="h4" gutterBottom>
          Sie können diese Aktivität nicht buchen
        </Typography>
        <Container maxWidth="xs">
          <Typography
            sx={{
              color: "grey.900",
            }}
          >
            Leider ist dieser Termin bereits ausgebucht. Bitte buchen Sie ein
            anderes Zeitfenster.
          </Typography>
        </Container>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        href={`/kurskatalog`}
        LinkComponent={Link}
      >
        Kurskatalog einsehen
      </Button>
    </Stack>
  );
}
