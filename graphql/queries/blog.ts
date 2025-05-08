import { gql } from "@apollo/client";
import { BlogPostBasicData } from "../fragments/blog";

export const GET_ALL_POSTS = gql`
  query GET_ALL_POSTS($limit: Int, $preview: Boolean) {
    pageBlogPostCollection(limit: $limit, preview: $preview) {
      items {
        ...BlogPostBasicData
      }
    }
  }
  ${BlogPostBasicData}
`;

export const GET_SLUGS_FOR_ALL_POSTS = gql`
  query GET_SLUGS_FOR_ALL_POSTS($preview: Boolean) {
    pageBlogPostCollection(preview: $preview) {
      items {
        slug
        publishedDate
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GET_POST_BY_SLUG($slug: String!, $preview: Boolean) {
    pageBlogPostCollection(
      where: { slug: $slug }
      limit: 1
      preview: $preview
    ) {
      items {
        ...BlogPostBasicData
        readingTime
        seoFields {
          pageTitle
          pageDescription
        }
        content {
          json
          links {
            entries {
              block {
                sys {
                  id
                }
                __typename

                ... on ComponentRichImage {
                  image {
                    title
                    width
                    height
                    url
                  }
                  caption
                  fullWidth
                }
              }
            }
          }
        }
        relatedPosts: relatedBlogPostsCollection(limit: 3) {
          items {
            ...BlogPostBasicData
          }
        }
      }
    }
  }
  ${BlogPostBasicData}
`;
