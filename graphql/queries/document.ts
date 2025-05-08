import { gql } from "@apollo/client";

export const GET_DOCUMENT_PAGE = gql`
  query GET_DOCUMENT_PAGE($slug: String!, $preview: Boolean) {
    pageFaqCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        _id
        sys {
          id
        }
        title
        slug
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
        seoFields {
          pageTitle
          pageDescription
        }
      }
    }
  }
`;

export const GET_ALL_DOCUMENTS_SLUGS = gql`
  query GET_ALL_DOCUMENTS_SLUGS {
    pageFaqCollection(preview: false) {
      items {
        slug
      }
    }
  }
`;
