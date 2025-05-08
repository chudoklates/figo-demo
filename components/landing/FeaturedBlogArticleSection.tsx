import { Box, Container, Stack, Typography } from "@mui/material";
import { FeaturedPostCard } from "../blog";
import { ComponentFeaturedArticleSection } from "@/api/types/cms";
import CTA from "./components/CTA";

export default async function FeaturedBlogArticleSection({
  post,
  title,
  cta,
}: ComponentFeaturedArticleSection) {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 12.5 },
        bgcolor: "secondary.main",
      }}
    >
      <Container
        component={Stack}
        maxWidth="md"
        spacing={7}
        sx={{ maxWidth: "100%", alignItems: "center" }}
      >
        <Stack spacing={3.75} sx={{ width: "100%" }}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
          <FeaturedPostCard post={post} />
        </Stack>
        <CTA {...cta} />
      </Container>
    </Box>
  );
}
