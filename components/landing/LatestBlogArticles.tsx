import { Alert, Container, Grid2, Stack, Typography } from "@mui/material";
import { BlogPostCard } from "../blog";
import { getBlogArticlesList } from "@/app/actions/cms";

export default async function LatestBlogArticles() {
  const { items, error } = await getBlogArticlesList();

  if (error) {
    return (
      <Stack sx={{ py: 5, alignItems: "center" }}>
        <Alert severity="error">
          <Typography>Es gibt ein Fehler beim Laden der Artikel</Typography>
        </Alert>
      </Stack>
    );
  }

  return (
    <Container component="section" sx={{ py: 5 }}>
      <Stack spacing={2.5}>
        <Typography variant="h2">Neueste Artikel</Typography>
        <Grid2 container spacing={2}>
          {items
            .toSorted(
              (a, b) =>
                new Date(b.publishedDate).getTime() -
                new Date(a.publishedDate).getTime()
            )
            .slice(0, 3)
            .map((post) => (
              <Grid2 key={post.sys.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <BlogPostCard post={post} />
              </Grid2>
            ))}
        </Grid2>
      </Stack>
    </Container>
  );
}
