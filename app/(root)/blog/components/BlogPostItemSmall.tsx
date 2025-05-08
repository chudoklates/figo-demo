import { BlogPost } from "@/graphql/types/blog";
import { ContentfulImage } from "@/components";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function BlogPostItemSmall({ post }: { post: BlogPost }) {
  return (
    <Card
      variant="outlined"
      sx={{
        border: "none",
        bgcolor: "transparent",
        flexBasis: "33%",
        width: "100%",
      }}
    >
      <CardActionArea
        href={`/blog/post/${post.slug}`}
        LinkComponent={Link}
        disableRipple
        sx={{ display: "flex", width: "100%", justifyContent: "stretch" }}
      >
        {post.featuredImage?.url && (
          <CardMedia>
            <ContentfulImage
              src={post?.featuredImage?.url}
              alt={post?.featuredImage?.title}
              width={127}
              height={100}
              style={{ objectFit: "cover", borderRadius: "4px" }}
            />
          </CardMedia>
        )}
        <CardContent sx={{ py: 0 }}>
          <Typography variant="body2">
            {new Date(post.publishedDate).toLocaleDateString("de-DE", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </Typography>
          <Typography
            component="h3"
            sx={{ fontSize: 20, lineHeight: "24px", fontWeight: 600 }}
          >
            {post.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
