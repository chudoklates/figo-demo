import type { BlogPost } from "@/api/types/blog";
import { ContentfulImage } from "@/components";
import { Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

export default function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <Stack spacing={{ xs: 2.5, md: 3.75 }}>
      {post.featuredImage?.url && (
        <ContentfulImage
          src={post.featuredImage.url}
          alt={post.featuredImage.title}
          width={852}
          height={240}
          style={{ objectFit: "cover", borderRadius: 20, width: "100%" }}
        />
      )}
      <Stack spacing={1.25}>
        <Typography variant="h4">{post.title}</Typography>
        <Typography>{post.shortDescription}</Typography>
        <Link
          href={`/blog/post/${post.slug}`}
          underline="always"
          component={NextLink}
          sx={{
            fontWeight: 700,
            color: "inherit",
            fontSize: 20,
            lineHeight: "30px",
          }}
        >
          Mehr darüber lesen
        </Link>
      </Stack>
    </Stack>
  );
}
