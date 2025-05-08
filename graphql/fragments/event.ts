import { gql } from "@apollo/client";

export const RestaurantData = gql`
  fragment RestaurantData on Restaurant {
    _id
    sys {
      id
    }
    name
    slug
    location {
      lat
      lng: lon
    }
    placeId
    restaurantImage {
      url
      title
      width
      height
    }
    wheelchairAccessible
  }
`;

export const TimeslotListData = gql`
  fragment TimeslotListData on TimeSlot {
    _id
    sys {
      id
    }
    slug
    seats
    startDate
    restaurant {
      ...RestaurantData
    }
  }
  ${RestaurantData}
`;

export const TimeslotFullData = gql`
  fragment TimeslotFullData on TimeSlot {
    ...TimeslotListData
    richDescription {
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
  }
  ${TimeslotListData}
`;
