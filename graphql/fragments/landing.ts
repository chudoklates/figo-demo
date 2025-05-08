import { gql } from "@apollo/client";
import { BlogPostBasicData } from "./blog";

export const CTAData = gql`
  fragment CTAData on ComponentCta {
    _id
    sys {
      id
    }
    label
    href
    variant
    color
    startIcon
    endIcon
    sx
  }
`;

export const ComponentBackgroundHeroData = gql`
  fragment ComponentBackgroundHeroData on ComponentBackgroundHero {
    _id
    sys {
      id
    }
    titleLine1
    titleLine2
    subtitle {
      json
    }
    cta {
      ...CTAData
    }
  }
  ${CTAData}
`;

export const ComponentFeaturedArticleSectionData = gql`
  fragment ComponentFeaturedArticleSectionData on ComponentFeaturedArticleSection {
    _id
    sys {
      id
    }
    title
    post {
      ...BlogPostBasicData
    }
    cta {
      ...CTAData
    }
  }
  ${BlogPostBasicData}
  ${CTAData}
`;

export const ComponentHowItWorksSectionData = gql`
  fragment ComponentHowItWorksSectionData on ComponentHowItWorksSection {
    _id
    sys {
      id
    }
    title
    subtitle {
      json
    }
    itemsCollection(preview: $preview, limit: 3) {
      items {
        _id
        sys {
          id
        }
        title
        text
        image {
          url
          title
          width
          height
        }
      }
    }
    cta {
      ...CTAData
    }
  }
  ${CTAData}
`;

export const ComponentTestimonialsSectionData = gql`
  fragment ComponentTestimonialsSectionData on ComponentTestimonialsSection {
    _id
    sys {
      id
    }
    title
    simpleSubtitle: subtitle
    testimonialsCollection(preview: $preview, limit: 10) {
      items {
        _id
        sys {
          id
        }
        content {
          json
        }
        author {
          name
          avatar {
            url
            title
          }
          position
        }
        nOfColumns
      }
    }
    cta {
      ...CTAData
    }
  }
  ${CTAData}
`;

export const ComponentTextImageSectionData = gql`
  fragment ComponentTextImageSectionData on ComponentTextImageSection {
    _id
    sys {
      id
    }
    content {
      json
    }
    image {
      url
      title
      width
      height
    }
  }
`;

export const ComponentUpcomingEventsSectionData = gql`
  fragment ComponentUpcomingEventsSectionData on ComponentUpcomingEventsSection {
    _id
    sys {
      id
    }
    title
    cta {
      ...CTAData
    }
  }
  ${CTAData}
`;
