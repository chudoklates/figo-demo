import type {
  Content,
  ContentfulImage,
  ContentfulTagName,
  SEOFields,
} from "./cms";

export type ContentfulAuthor = {
  avatar: ContentfulImage;
  name: string;
  bio: string;
  position: string;
};

export type BlogPost = {
  _id: string;
  sys: {
    id: string;
  };
  author?: ContentfulAuthor;
  title: string;
  slug: string;
  shortDescription: string;
  highlighted: boolean;
  seoFields?: SEOFields;
  contentfulMetadata: {
    tags: {
      id: string;
      name: ContentfulTagName;
    }[];
  };
  publishedDate: string;
  featuredImage?: {
    url: string;
    title: string;
  };
  content: Content;
  readingTime: number;
  relatedPosts: BlogPostCollection;
};

export type BlogPostCollection = {
  items: BlogPost[];
};
