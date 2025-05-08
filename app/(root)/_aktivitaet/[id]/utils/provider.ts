import { Provider, ProviderInfo } from "@/api/types/activities";
import { FileObject, GoogleReview } from "@/api/types/misc";
import { getFieldValue, getObjectSetFieldValue } from "@/utils/field";

export const getProviderInfo = (provider: ProviderInfo): Provider => {
  const profile_image =
    getFieldValue<FileObject>(provider.fields, "profile_image") || null;
  const first_name = getFieldValue<string>(provider.fields, "first_name") || "";
  const last_name = getFieldValue<string>(provider.fields, "last_name") || "";
  const name = getFieldValue<string>(provider.fields, "name") || "";
  const imprints =
    getFieldValue<FileObject>(provider.fields, "imprints") || null;
  const tAndCs = getFieldValue<FileObject>(provider.fields, "t_c") || null;
  const placeId = getFieldValue<string>(provider.fields, "google_place_id");
  const googleReviews = getObjectSetFieldValue<GoogleReview>(
    provider.fields,
    "google_reviews"
  );

  return {
    profile_image,
    first_name,
    last_name,
    name,
    imprints,
    tAndCs,
    googleReviews,
    placeId,
  };
};
