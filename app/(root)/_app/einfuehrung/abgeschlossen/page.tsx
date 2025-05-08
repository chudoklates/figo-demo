import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "next/image";

import happyBalloon from "@/public/person-happy-balloon.svg";
import ButtonLink from "./components/ButtonLink";

export default function Complete() {
  return (
    <Container component="main" maxWidth="xl">
      <Stack
        spacing={3.75}
        sx={{
          pb: 20,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Image
          alt="Eine Person, die drei Luftballons hält, einen mit einem Smiley und einen mit einem Herz."
          src={happyBalloon}
          style={{ width: 250, height: "auto" }}
        />
        <Typography variant="h3">Wunderbar!</Typography>
        <Typography>
          Ihr Profil wurde erfolgreich eingerichtet. Sie
          <br /> können jetzt loslegen.
        </Typography>
        <ButtonLink />
      </Stack>
    </Container>
  );
}
