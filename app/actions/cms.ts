"use server";

import { GET_ALL_POSTS, GET_SLUGS_FOR_ALL_POSTS } from "@/graphql/queries/blog";
import {
  GET_SLUGS_FOR_ALL_TIMESLOTS,
  GET_TIMESLOT,
  GET_UPCOMING_TIMESLOTS,
  GET_TIMESLOT_BY_SLUG,
} from "@/graphql/queries/event";
import { BlogPostCollection } from "@/graphql/types/blog";
import { Collection, ContentfulPagination } from "@/graphql/types/cms";
import { TimeSlot, TimeSlotFilter } from "@/graphql/types/event";
import { contentfulClient } from "@/lib/cms";
import { draftMode } from "next/headers";

export const getBlogArticlesList = async () => {
  const { isEnabled } = await draftMode();

  const { data, error } = await contentfulClient
    .getClient()
    .query<{ pageBlogPostCollection: BlogPostCollection }>({
      query: GET_ALL_POSTS,
      variables: {
        limit: 10,
        preview: isEnabled,
      },
      context: {
        draft: isEnabled,
      },
    });

  if (error) console.error(error);

  const items = data?.pageBlogPostCollection?.items || [];

  return { items, error };
};

export const getAllBlogArticleSlugs = async () => {
  const { data } = await contentfulClient.getClient().query<{
    pageBlogPostCollection?: {
      items: { slug: string; publishedDate: string }[];
    };
  }>({
    query: GET_SLUGS_FOR_ALL_POSTS,
    variables: {
      preview: false,
    },
  });

  return data?.pageBlogPostCollection?.items || [];
};

export const getTimeslot = async (id?: string) => {
  if (!id) return null;

  const { isEnabled } = await draftMode();

  const { data } = await contentfulClient.getClient().query<{
    timeSlot: TimeSlot;
  }>({
    query: GET_TIMESLOT,
    variables: {
      id,
      preview: isEnabled,
    },
    context: {
      draft: isEnabled,
    },
  });

  return data?.timeSlot;
};

export const getUpcomingTimeslotForRestaurant = async (slug: string) => {
  const { isEnabled } = await draftMode();

  const { data } = await contentfulClient.getClient().query<
    {
      timeSlotCollection: Collection<TimeSlot>;
    },
    { limit: number; preview: boolean; where: TimeSlotFilter }
  >({
    query: GET_UPCOMING_TIMESLOTS,
    variables: {
      limit: 1,
      preview: isEnabled,
      where: {
        startDate_gte: new Date().toISOString(),
        seats_gt: 0,
        restaurant: {
          slug,
        },
      },
    },
    context: {
      draft: isEnabled,
    },
  });

  return data?.timeSlotCollection?.items?.[0];
};

export const getTimeslotBySlug = async (slug: string) => {
  const { isEnabled } = await draftMode();

  const { data } = await contentfulClient.getClient().query<
    {
      timeSlotCollection: Collection<TimeSlot>;
    },
    { slug: string; preview: boolean }
  >({
    query: GET_TIMESLOT_BY_SLUG,
    variables: {
      slug,
      preview: isEnabled,
    },
    context: {
      draft: isEnabled,
    },
  });

  return data?.timeSlotCollection?.items?.[0];
};

export const getAllTimeslotsSlugs = async () => {
  const { data } = await contentfulClient.getClient().query<
    {
      timeSlotCollection?: Collection<{
        slug: string;
        sys: { publishedAt: string };
      }>;
    },
    { date: string }
  >({
    query: GET_SLUGS_FOR_ALL_TIMESLOTS,
    variables: {
      date: new Date().toISOString(),
    },
  });

  return data?.timeSlotCollection?.items || [];
};

export const getUpcomingEvents = async (
  where: TimeSlotFilter,
  { skip, limit = 3 }: ContentfulPagination
) => {
  const { isEnabled } = await draftMode();

  const { data } = await contentfulClient
    .getClient()
    .query<{ timeSlotCollection: Collection<TimeSlot> }>({
      query: GET_UPCOMING_TIMESLOTS,
      variables: {
        limit,
        skip,
        preview: isEnabled,
        where,
      },
      context: {
        draft: isEnabled,
      },
    });

  return data?.timeSlotCollection;
};
