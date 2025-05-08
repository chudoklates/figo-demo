import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";

export default function ErrorPage({ children }: PropsWithChildren) {
  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Uuuuups....
        </Typography>
        <Typography variant="h4">Etwas ist schief gegangen!</Typography>
      </Box>
      <Image
        width={370}
        height={370}
        alt="Lantern shining light"
        src="/lantern.svg"
      />
      <Typography align="center">{children}</Typography>
    </Stack>
  );
}
