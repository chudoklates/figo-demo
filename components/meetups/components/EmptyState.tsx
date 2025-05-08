import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import emptyState from "@/public/empty-state.webp";
import { PropsWithChildren } from "react";

export default function EmptyState({ children }: PropsWithChildren) {
  return (
    <Stack
      spacing={2.5}
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={emptyState}
        alt="Kalendar"
        width={600}
        style={{ width: 300, height: "auto" }}
      />
      <Typography align="center">
        Es gibt leider keine Ergebnisse, die diesen Filtern entsprechen.
      </Typography>
      {children}
    </Stack>
  );
}
