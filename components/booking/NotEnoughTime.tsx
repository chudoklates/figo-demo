import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import outOfTime from "@/public/out-of-time.webp";

export default function NotEnoughTime() {
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
      <Image
        src={outOfTime}
        alt="alarm clock"
        style={{ width: 150, height: "auto" }}
      />
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
            Es tut uns leid, aber diese Aktivität kann nicht gebucht werden, da
            sie <strong>in weniger als 1 Stunde beginnt</strong>. Stöbern Sie in
            unserem Kurskatalog und entdecken Sie stattdessen eine andere
            spannende Aktivität, die Sie genießen können.
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
