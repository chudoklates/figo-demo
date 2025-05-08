import { BlogPost } from "@/api/types/blog";
import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import { BlogPostCard } from "@/components";

export default function RelatedArticles({ post }: { post: BlogPost }) {
  return (
    <Box sx={{ bgcolor: "beige.light", py: 12.5 }}>
      <Container maxWidth="lg" component={Stack} spacing={2.5}>
        <Typography variant="h2">Ähnliche Artikel</Typography>
        <Grid2 container spacing={2}>
          {post?.relatedPosts?.items?.map((related) => (
            <Grid2 key={related.sys.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <BlogPostCard post={related} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
