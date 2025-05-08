import { gql } from "@apollo/client";

export const BlogPostBasicData = gql`
  fragment BlogPostBasicData on PageBlogPost {
    _id
    sys {
      id
    }
    title
    slug
    publishedDate
    shortDescription
    featuredImage {
      url
      title
      width
      height
    }
    contentfulMetadata {
      tags {
        id
        name
      }
    }
    author {
      _id
      name
      avatar {
        url
        title
      }
      bio
      position
    }
    highlighted
  }
`;
