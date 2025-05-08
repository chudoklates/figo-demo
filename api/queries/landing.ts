import { gql } from "@apollo/client";
import {
  ComponentBackgroundHeroData,
  ComponentFeaturedArticleSectionData,
  ComponentHowItWorksSectionData,
  ComponentTestimonialsSectionData,
  ComponentTextImageSectionData,
  ComponentUpcomingEventsSectionData,
} from "../fragments/landing";
import { BlogPostBasicData } from "../fragments/blog";

export const GET_HOMEPAGE = gql`
  query GET_HOMEPAGE($preview: Boolean) {
    pageLandingCollection(
      where: { internalName: "Homepage" }
      limit: 1
      preview: $preview
    ) {
      items {
        _id
        sys {
          id
        }
        internalName
        seoFields {
          pageTitle
          pageDescription
        }
        contentCollection(preview: $preview, limit: 20) {
          items {
            __typename

            ... on ComponentBackgroundHero {
              ...ComponentBackgroundHeroData
            }

            ... on ComponentTextImageSection {
              ...ComponentTextImageSectionData
            }

            ... on ComponentHowItWorksSection {
              ...ComponentHowItWorksSectionData
            }

            ... on ComponentTestimonialsSection {
              ...ComponentTestimonialsSectionData
            }

            ... on ComponentUpcomingEventsSection {
              ...ComponentUpcomingEventsSectionData
            }

            ... on ComponentFeaturedArticleSection {
              ...ComponentFeaturedArticleSectionData
            }
          }
        }
      }
    }
  }
  ${ComponentBackgroundHeroData}
  ${ComponentTextImageSectionData}
  ${ComponentHowItWorksSectionData}
  ${ComponentTestimonialsSectionData}
  ${ComponentUpcomingEventsSectionData}
  ${ComponentFeaturedArticleSectionData}
`;
