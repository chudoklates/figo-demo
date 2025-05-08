import { LocationData } from "@/types/geo";
import type { Field } from "./fields";
import type { FileObject, GoogleReview, Pagination } from "./misc";

export type SEOMetadata = {
  title: string;
  description: string;
  image_alt: string;
  image?: FileObject;
};

export type ActivityCategory =
  | "painting"
  | "it"
  | "pilates"
  | "drawing"
  | "cantienica"
  | "creative_writing"
  | "yoga"
  | "tai_chi"
  | "qigong"
  | "dancing"
  | "macrame"
  | "language_classes"
  | "kungfu"
  | "meditation"
  | "theater";

export type Variant = {
  id: string;
  is_active?: boolean;
  variant_group?: string;
  fields: Array<Field<any>>;
};

export type VariantBookingOption = Variant & {
  startDate: Date;
  seats: number;
};

export type ActivityRaw = {
  id: string;
  created_at?: string;
  is_active?: boolean;
  type?: {
    id: string;
    name: string;
    match_configurations: Array<{
      pricing_enabled: boolean;
    }>;
  };
  fields: Array<Field<any>>;
  provider?: {
    id_participant: string;
    fields: Array<Field<any>>;
  };
  variant_group?: string;
  variants?: Array<Variant>;
};

export type ProviderInfo = {
  id_participant: string;
  fields: Array<Field<any>>;
};

export type Activity = {
  id: string;
  /**
   * Name of the activity
   */
  name: string;
  /**
   * Description of the activity
   */
  description: string;
  /**
   * Main thumbnail image of the activity
   */
  mainImage?: FileObject;
  /**
   * Start date of the activity in ISO 8601 format
   */
  startDate: Date;
  /**
   * Location of the activity
   */
  location?: LocationData;
  /**
   * Categories of the activity
   */
  activityCategory?: ActivityCategory[];
  /**
   * Categories of the activity
   */
  categoryOptions?: { label: string; value: string }[];
  /**
   * Relevance score of the activity
   */
  score?: number;
  /**
   * Activity vendor information
   */
  provider?: ProviderInfo;
  /**
   * Upcoming variants of the activity
   */
  upcomingVariants: Array<VariantBookingOption>;
  /**
   * Next upcoming variant of the activity
   */
  nextUpcomingVariant?: VariantBookingOption;
  /**
   * Duration of the activity in minutes
   */
  duration?: number;
  /**
   * Instructions on how to get to the activity
   */
  howToGetThere?: string;
  /**
   * On what days of the week does the activity take place, if recurring
   */
  recurring: { label: string; value: string }[];
  /**
   * The number of available seats for booking
   */
  seats: number;
  /**
   * The SEO metadata for the activity
   */
  meta?: SEOMetadata;
  /**
   * The currently shown activity, presented as a variant
   */
  raw: ActivityRaw;
  /*
   * The google reviews for this specific activity (overrides the reviews of
   * the vendor)
   */
  googleReviews?: GoogleReview[] | undefined;
};

export type MappedActivity = Activity & {
  /**
   * Distance of the activity from the chosen/user's location
   */
  distance: number;
  /**
   * Relevance score of the activity
   */
  score: number;
};

export type Provider = {
  first_name: string;
  last_name: string;
  name: string;
  profile_image: FileObject | null;
  imprints: FileObject | null;
  tAndCs: FileObject | null;
  googleReviews?: GoogleReview[] | undefined;
  placeId: string | undefined;
};

export type ActivityPagination = Pagination<ActivityRaw>;
