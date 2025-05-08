import type { LocationData } from "@/types/geo";
import type { Field } from "./fields";
import type { FileObject } from "./misc";
import { ActivityCategory } from "./activities";

export type Me = {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

export type OnboardingProgress = {
  status: string;
  status_tech_name: "onboarded" | "interessen" | "standort";
  next_steps: {
    type: string;
    config: string;
  }[];
};

export type MyParticipantsType = {
  id: string;
  status: "ONBOARDING" | "ONBOARDED";
  onboarding_progress: OnboardingProgress;
  fields: Field<any>[];
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  /**
   * User's email address
   */
  email: string;
  /**
   * User's profile image URL
   */
  profile_image?: FileObject;
  /**
   * User's remaining credits
   */
  credits: number;
  /**
   * User's preferred categories
   */
  preferred_categories: ActivityCategory[];
  /**
   * User's location represented as a Google Maps Place-compatible object
   */
  location?: LocationData;
  /**
   * User's birth date in ISO 8601 format
   */
  birth_date: string;
  /**
   * The ID of the subscription object on Stripe
   */
  stripe_subscription_id: string;
  /**
   * The ID of the single-purchase product object on Stripe
   */
  stripe_package_id: string;
  /**
   * Credit expiration date
   */
  credit_expiration_date: string;
  /**
   * A flag indicating whether the user their free class available
   */
  has_free_class: boolean;
  /**
   * Whether the user converted from an activity page and a booking should be
   * made after registration
   */
  auto_book_activity?: string;
  /**
   * Onboarding status
   */
  status: "ONBOARDED" | "ONBOARDING";
  /**
   * Onboarding progress of the user
   */
  onboarding_progress: OnboardingProgress;
  /**
   * Fields in their raw form
   */
  fields: Field<any>[];
  __typename: "Participant";
};
