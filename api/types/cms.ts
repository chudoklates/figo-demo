import { BlogPost, ContentfulAuthor } from "./blog";

export interface Entry {
  sys: {
    id: string;
  };
  __typename: string;
}

type CTAIcon = "Whatsapp" | "ArrowForward" | "ArrowOutward";
type CTAColor = "Figo Primary" | "Figo Secondary" | "Whatsapp" | "Black";

export type CTAType = {
  label: string;
  href: string;
  variant: "contained" | "outlined";
  color: CTAColor;
  startIcon?: CTAIcon;
  endIcon?: CTAIcon;
  sx?: any;
};

export type ContentfulTagName =
  | "Ratgeber"
  | "Über uns"
  | "Gesellschaft"
  | "Erfahrungsberichte";

export type ContentfulImage = {
  url: string;
  title?: string;
  width?: number;
  height?: number;
};

export interface ComponentRichImage extends Entry {
  image: ContentfulImage;
  caption: string;
  fullWidth: boolean;
  __typename: "ComponentRichImage";
}

export interface EntryLink {
  block: ComponentRichImage[];
}

export interface Content {
  json: any;
  links?: {
    entries?: EntryLink;
  };
}

export type SEOFields = {
  pageTitle: string;
  pageDescription: string;
};

export type ContentfulPagination = {
  skip: number;
  limit: number;
};

export type DocumentPage = {
  slug: string;
  title: string;
  content: Content;
  seoFields: SEOFields;
};

export type ComponentBackgroundHero = {
  __typename: "ComponentBackgroundHero";
  titleLine1: string;
  titleLine2: string;
  subtitle: Content;
  cta: CTAType;
};

export type ComponentFeaturedArticleSection = {
  __typename: "ComponentFeaturedArticleSection";
  title: string;
  post: BlogPost;
  cta: CTAType;
};

export interface HowItWorksItem extends Entry {
  title: string;
  text: string;
  image: ContentfulImage;
}

export type ComponentHowItWorksSection = {
  __typename: "ComponentHowItWorksSection";
  title: string;
  subtitle: Content;
  itemsCollection: Collection<HowItWorksItem>;
  cta: CTAType;
};

export interface Testimonial extends Entry {
  content: Content;
  nOfColumns: number;
  author: ContentfulAuthor;
}

export type ComponentTestimonialsSection = {
  __typename: "ComponentTestimonialsSection";
  title: string;
  simpleSubtitle: string;
  testimonialsCollection: Collection<Testimonial>;
  cta: CTAType;
};

export type ComponentTextImageSection = {
  __typename: "ComponentTextImageSection";
  content: Content;
  image: ContentfulImage;
};

export type ComponentUpcomingEventsSection = {
  __typename: "ComponentUpcomingEventsSection";
  title: string;
  cta: CTAType;
};

export type DynamicContentType = Collection<
  | ComponentBackgroundHero
  | ComponentFeaturedArticleSection
  | ComponentHowItWorksSection
  | ComponentTestimonialsSection
  | ComponentTextImageSection
  | ComponentUpcomingEventsSection
>;

export type Homepage = {
  internalName: string;
  heroContent: Content;
  heroImage: ContentfulImage;
  eventListContent: Content;
  seoFields: SEOFields;
  featuredPost?: BlogPost;
  contentCollection: DynamicContentType;
};

export type Collection<P> = {
  items: P[];
  total?: number;
  skip?: number;
  limit?: number;
};
