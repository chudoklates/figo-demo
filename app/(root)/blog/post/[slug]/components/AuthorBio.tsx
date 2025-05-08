import { BlogPost } from "@/api/types/blog";
import { NextImageAvatar } from "@/components";
import { Box, Container, Stack, Typography } from "@mui/material";

export default function AuthorBio({ post }: { post: BlogPost }) {
  if (!post.author) return null;

  return (
    <Container>
      <Box
        sx={{
          bgcolor: "beige.main",
          p: { xs: 5, md: 6 },
          borderRadius: "12px",
        }}
      >
        <Container maxWidth="md">
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <NextImageAvatar
                src={post.author.avatar.url}
                alt={post.author.name}
                sx={{ width: 50, height: 50 }}
                contentful
              />
              <Box>
                <Typography variant="h6">{post.author.name}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {post.author.position}
                </Typography>
              </Box>
            </Stack>
            {post.author.bio && <Typography>{post.author.bio}</Typography>}
          </Stack>
        </Container>
      </Box>
    </Container>
  );
}
