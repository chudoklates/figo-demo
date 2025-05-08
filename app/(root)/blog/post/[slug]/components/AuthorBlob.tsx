import { BlogPost } from "@/api/types/blog";
import { NextImageAvatar } from "@/components";
import { Stack, Typography } from "@mui/material";

export default function AuthorBlob({ post }: { post: BlogPost }) {
  if (!post.author) return null;

  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <NextImageAvatar
        src={post.author.avatar.url}
        alt={post.author.name}
        sx={{ width: 36, height: 36 }}
        contentful
      />
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontWeight: 500 }}
      >
        {post.author.name}
      </Typography>
    </Stack>
  );
}
