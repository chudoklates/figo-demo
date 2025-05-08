import { BlogPost } from "@/graphql/types/blog";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import AuthorBlob from "./AuthorBlob";
import { TagChip } from "@/components";
import SharePopup from "./SharePopup";
import ShareDrawer from "./ShareDrawer";

export default function ArticleHeader({ post }: { post: BlogPost }) {
  return (
    <Box sx={{ bgcolor: "beige.main", pt: { xs: 5, md: 10 } }}>
      <Container
        disableGutters
        component={Box}
        sx={{
          bgcolor: { xs: "transparent", md: "rgba(255, 255, 255, 0.90)" },
          pt: { xs: 0, md: 10 },
          pb: { xs: 0, md: 1.25 },
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={2.5} sx={{ pb: { xs: 3, md: 5 } }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              {post.contentfulMetadata.tags.map((tag) => (
                <TagChip key={tag.id} label={tag.name} />
              ))}
              <ShareDrawer post={post} />
            </Stack>
            <Typography variant="h2" component="h1">
              {post.title}
            </Typography>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Stack
                direction="row"
                spacing={2.5}
                sx={{
                  alignItems: "center",
                  justifyContent: { xs: "space-between", md: "flex-start" },
                  flexGrow: 1,
                }}
              >
                <AuthorBlob post={post} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {new Date(post.publishedDate).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {post.readingTime} Min. Lesezeit
                </Typography>
              </Stack>
              <SharePopup post={post} />
            </Stack>
          </Stack>
          <Divider sx={{ display: { xs: "none", md: "block" } }} />
        </Container>
      </Container>
    </Box>
  );
}
