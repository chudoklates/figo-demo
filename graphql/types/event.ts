import { LocationInfo } from "@/types/geo";
import type { Content, ContentfulImage, SEOFields } from "./cms";

export type TimeSlot = {
  _id: string;
  sys: {
    id: string;
  };
  slug: string;
  startDate: string;
  seats: number;
  richDescription?: Content;
  restaurant?: Restaurant;
  linkedFrom?: {
    restaurantCollection: {
      items: Restaurant[];
    };
  };
};

export type Restaurant = {
  _id: string;
  sys: {
    id: string;
  };
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  slug: string;
  placeId?: string;
  restaurantImage?: ContentfulImage;
  wheelchairAccessible?: boolean;
  timeSlotsCollection?: TimeSlotCollection;
};

export type Event = {
  timeSlotId: string;
  name: string;
  location?: LocationInfo;
  placeId?: string;
  wheelchairAccessible?: boolean;
  startDate: string;
  seats: number;
  restaurantImage?: ContentfulImage;
  richDescription?: Content;
  seoFields?: SEOFields;
  restaurant?: Restaurant;
};

export type TimeSlotCollection = {
  items: TimeSlot[];
  total: number;
};

export type RestaurantCollection = {
  items: Restaurant[];
  total: number;
};

export type RestaurantFilter = {
  slug?: string;
  location_within_circle?: {
    lat: number;
    lon: number;
    radius: number;
  };
  wheelchairAccessible?: boolean;
  timeSlotsCollection_exists?: boolean;
  timeSlots?: TimeSlotFilter;
  OR?: Array<RestaurantFilter>;
  AND?: Array<RestaurantFilter>;
};

export type TimeSlotFilter = {
  restaurant_exists?: boolean;
  restaurant?: RestaurantFilter;
  startDate_gte?: string;
  startDate_lt?: string;
  seats_gt?: number;
  OR?: Array<TimeSlotFilter>;
  AND?: Array<TimeSlotFilter>;
};
