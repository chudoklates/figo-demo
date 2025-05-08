import { Container, Grid2 } from "@mui/material";
import { ComponentTextImageSection } from "@/api/types/cms";
import { ContentfulImage } from "../cms";
import { RichText } from "../cms/RichText";

export default function TextSection({
  content,
  image,
}: ComponentTextImageSection) {
  return (
    <Grid2 container sx={{ bgcolor: "beige.main" }}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Container
          maxWidth="sm"
          sx={{ pt: { xs: 10, md: 12.5 }, pb: { xs: 5, md: 12.5 } }}
        >
          <RichText content={content} />
        </Container>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        {image?.url && (
          <ContentfulImage
            src={image.url}
            alt="Grüßen"
            width={684}
            height={456}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
      </Grid2>
    </Grid2>
  );
}
