import { Button, Container, Stack, Typography } from "@mui/material";
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
      <Typography variant="h3">
        Bitte schließen Sie Ihre Einführung ab
      </Typography>
      <Container maxWidth="xs">
        <Typography
          sx={{
            color: "grey.900",
          }}
        >
          Sie müssen zuerst Ihr Profil vervollständigen, bevor Sie eine
          Aktivität buchen können.
        </Typography>
      </Container>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        href="/app/einfuehrung"
        LinkComponent={Link}
      >
        Jetzt abschließen
      </Button>
    </Stack>
  );
}
