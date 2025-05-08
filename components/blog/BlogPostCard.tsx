import type { BlogPost } from "@/graphql/types/blog";
import { ContentfulImage, NextImageAvatar } from "@/components";
import { History } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/de";
import TagChip from "./TagChip";

dayjs.locale("de");
dayjs.extend(relativeTime);

export default function BlogPostCard({
  post,
  highlighted = false,
}: {
  post: BlogPost;
  highlighted?: boolean;
}) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: { xs: highlighted ? 0 : "4px", lg: "4px" },
      }}
    >
      <CardActionArea
        href={`/blog/post/${post.slug}`}
        LinkComponent={Link}
        disableRipple
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        {post.featuredImage?.url && !highlighted && (
          <ContentfulImage
            src={post.featuredImage.url}
            alt={post.featuredImage.title}
            width={600}
            height={240}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              flexBasis: 240,
              flexShrink: 1,
              overflow: "hidden",
            }}
          />
        )}
        {post.featuredImage?.url && highlighted && (
          <CardMedia
            sx={{
              position: "relative",
              flexBasis: { xs: 362, lg: 592 },
            }}
          >
            <ContentfulImage
              src={post.featuredImage.url}
              alt={post.featuredImage.title}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </CardMedia>
        )}
        <CardContent
          component={Stack}
          spacing={2}
          sx={{
            p: 2.5,
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Stack
            spacing={highlighted ? 2 : 0.5}
            sx={{ alignItems: "flex-start" }}
          >
            {post.contentfulMetadata.tags.map((tag) => (
              <TagChip key={tag.id} label={tag.name} />
            ))}
            <Typography variant={highlighted ? "h3" : "h4"}>
              {post.title}
            </Typography>
            {highlighted ? (
              <Typography>{post.shortDescription}</Typography>
            ) : null}
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {post.author && (
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
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
            )}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                color: "grey.800",
              }}
            >
              <History color="inherit" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {dayjs(post.publishedDate).fromNow()}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
