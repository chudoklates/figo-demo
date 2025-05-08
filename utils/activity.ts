import {
  Activity,
  ActivityRaw,
  ActivityCategory,
  Variant,
  VariantBookingOption,
  SEOMetadata,
} from "@/api/types/activities";
import {
  getFieldOptions,
  getFieldValue,
  getObjectFieldValue,
  getObjectSetFieldValue,
} from "./field";
import { FileObject, GoogleReview } from "@/api/types/misc";
import { LocationData } from "@/types/geo";
import { TransactionLight } from "@/api/types/transactions";

export function getVariantStartDate(variant: Variant | null): Date | null {
  if (!variant) return null;

  const startDate = getFieldValue<string>(variant.fields, "startdate");
  return startDate ? new Date(startDate) : null;
}

function getUpcomingVariants(variants: Variant[]) {
  return variants
    .filter((variant) => {
      return variant.is_active === undefined || variant.is_active;
    })
    .map((variant) => ({
      ...variant,
      seats: getFieldValue<number>(variant.fields, "seats") || 0,
      startDate: getVariantStartDate(variant),
    }))
    .filter((variant): variant is VariantBookingOption => {
      return !!variant.startDate;
    })
    .filter(({ startDate }) => startDate > new Date())
    .sort((a, b) => {
      return a.startDate!.getTime() - b.startDate!.getTime();
    });
}

export function getActivity(rawActivity: ActivityRaw): Activity {
  const { variants } = rawActivity;

  const upcomingVariants = variants ? getUpcomingVariants(variants) : [];

  const [nextUpcomingVariant] = upcomingVariants;

  const name = getFieldValue<string>(rawActivity.fields, "name") || "";
  const description =
    getFieldValue<string>(rawActivity.fields, "description") || "";
  const mainImage = getFieldValue<FileObject>(rawActivity.fields, "main_image");
  const startDate = new Date(
    getFieldValue<string>(rawActivity.fields, "startdate")!
  );
  const location = getFieldValue<LocationData>(rawActivity.fields, "location");
  const activityCategory = getFieldValue<ActivityCategory[]>(
    rawActivity.fields,
    "activity_category"
  );
  const categoryOptions = getFieldOptions(rawActivity, "activity_category");
  const duration = getFieldValue<number>(rawActivity.fields, "duration");
  const howToGetThere = getFieldValue<string>(
    rawActivity.fields,
    "how_to_get_there"
  );
  const seats = getFieldValue<number>(rawActivity.fields, "seats") || 0;
  const recurringValue =
    getFieldValue<string[]>(rawActivity.fields, "recurring") || [];
  const recurringOptions = getFieldOptions(rawActivity, "recurring") || [];

  const meta = getObjectFieldValue<SEOMetadata>(rawActivity.fields, "meta");

  const googleReviews = getObjectSetFieldValue<GoogleReview>(
    rawActivity.fields,
    "google_reviews"
  );

  const recurring = recurringOptions.filter((option) =>
    recurringValue.includes(option.value)
  );

  const provider = rawActivity.provider;

  return {
    id: rawActivity.id,
    name,
    description,
    mainImage,
    startDate,
    upcomingVariants,
    nextUpcomingVariant,
    location,
    activityCategory,
    categoryOptions,
    provider,
    duration,
    howToGetThere,
    recurring,
    seats,
    meta,
    raw: rawActivity,
    googleReviews,
  };
}

/**
 * Get the base64 encoded ID of an object for usage in URLs
 * @param id ID of form {spl | par | ven}-<hex encoded id>
 * @returns
 */
export const getUrlEncodedID = (id: string) => {
  return (
    Buffer.from(id.split("-")[1], "hex")
      .toString("base64")
      // Remove padding && replace characters for URL safety (comparable to base64url encoding, inaccessible in the browser)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
  );
};

export const findExistingBooking = (
  transactions: TransactionLight[],
  activity: Activity | Variant
) => {
  return transactions.find((transaction) => {
    return (
      transaction.match.id_supply === activity.id &&
      transaction.state.status_tech_name !== "cancelled"
    );
  });
};

export const getActivityFromBooking = (
  booking?: TransactionLight | null
): Activity | null => {
  if (!booking) return null;

  const { match } = booking;
  const activityRaw: ActivityRaw = {
    id: match.id_supply,
    fields: match.supply_fields,
    created_at: new Date().toISOString(),
    variants: [],
  };

  return getActivity(activityRaw);
};

export const getActivityLocationString = (activity: Activity) => {
  const { location } = activity;

  if (!location) return "";

  const neighbourhoodClean = location?.neighbourhood
    ?.replace(/Bezirk/gi, "")
    ?.replace(/Kiez/gi, "");

  return `${activity.location?.street} ${activity.location?.house_number}, ${activity.location?.postal_code}, ${neighbourhoodClean}`;
};
