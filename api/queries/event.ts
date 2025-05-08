import { gql } from "@apollo/client";
import { TimeslotFullData, TimeslotListData } from "../fragments/event";

export const GET_TIMESLOT_BY_SLUG = gql`
  query GET_TIMESLOT_BY_SLUG($slug: String!, $preview: Boolean) {
    timeSlotCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        ...TimeslotFullData
      }
    }
  }
  ${TimeslotFullData}
`;

export const GET_UPCOMING_TIMESLOTS = gql`
  query GET_UPCOMING_TIMESLOTS(
    $limit: Int
    $skip: Int
    $where: TimeSlotFilter
    $preview: Boolean
  ) {
    timeSlotCollection(
      limit: $limit
      skip: $skip
      where: $where
      preview: $preview
      order: startDate_ASC
    ) {
      items {
        ...TimeslotListData
      }
      total
    }
  }
  ${TimeslotListData}
`;

export const GET_SLUGS_FOR_ALL_TIMESLOTS = gql`
  query GET_SLUGS_FOR_ALL_TIMESLOTS($date: DateTime) {
    timeSlotCollection(
      where: { startDate_gt: $date, seats_gt: 0 }
      preview: false
    ) {
      items {
        sys {
          publishedAt
        }
        slug
      }
    }
  }
`;

export const GET_TIMESLOT = gql`
  query GET_TIMESLOT($id: String!, $preview: Boolean) {
    timeSlot(id: $id, preview: $preview) {
      ...TimeslotListData
    }
  }
  ${TimeslotListData}
`;
