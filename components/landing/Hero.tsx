import { Box, Container, Stack, Typography } from "@mui/material";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import type {
  Content,
  ContentfulImage as ContentfulImageType,
} from "@/api/types/cms";
import { RichText } from "../cms/RichText";
import { ContentfulImage } from "../cms";

export default function Hero({
  image,
  content,
}: {
  image: ContentfulImageType;
  content: Content;
}) {
  return (
    <Container maxWidth="sm" component="section">
      <Stack spacing={7.5} sx={{ py: 12.5, alignItems: "center" }}>
        <ContentfulImage
          src={image.url}
          width={600}
          height={600}
          alt={image.title || ""}
          priority
          style={{ width: 300, height: 300 }}
        />
        <Box>
          <RichText content={content} />
        </Box>
        <Stack spacing={0.5} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontWeight: 700 }}>
            Nächste Termine einsehen
          </Typography>
          <KeyboardDoubleArrowDown color="secondary" fontSize="large" />
        </Stack>
      </Stack>
    </Container>
  );
}
