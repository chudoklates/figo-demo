import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Activity, MappedActivity } from "@/graphql/types/activities";
import { getDistanceInKm } from "../geo/utils";
import { Filters } from "@/types/filters";

export default function useRelevanceAlgorithm(filters?: Filters) {
  const { user } = useContext(UserContext);

  const { location: userLocation, preferred_categories } = user || {};
  const { location: filterLocation } = filters || {};

  const location = filterLocation || userLocation;

  return (activity: Activity): MappedActivity => {
    let score = 0;
    let distance = NaN;

    if (activity.location && location) {
      distance = getDistanceInKm(location, activity.location);
      score += 10 / distance;
    }

    if (preferred_categories && activity.activityCategory) {
      const matchingCategories = activity.activityCategory.filter((category) =>
        preferred_categories.includes(category)
      );
      score += matchingCategories.length * 10;
    }

    return {
      ...activity,
      distance,
      score,
    };
  };
}
