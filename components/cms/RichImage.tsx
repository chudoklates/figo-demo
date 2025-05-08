import { ComponentRichImage } from "@/api/types/cms";
import { Stack, Typography } from "@mui/material";
import ContentfulImage from "./ContentfulImage";

export default function RichImage({ entry }: { entry: ComponentRichImage }) {
  return (
    <Stack
      spacing={2}
      sx={{
        my: 4,
        alignItems: "center",
        position: "relative",
        width: "100%",
        ...(entry.fullWidth && {
          height: 400,
        }),
      }}
    >
      <ContentfulImage
        src={entry.image.url}
        fill={entry.fullWidth}
        alt={entry.image.title || ""}
        style={{ objectFit: "cover" }}
        {...(!entry.fullWidth && {
          width: entry.image.width,
          height: entry.image.height,
          style: {
            maxWidth: "100%",
            height: "auto",
          },
        })}
      />
      <Typography variant="caption">{entry.caption}</Typography>
    </Stack>
  );
}
