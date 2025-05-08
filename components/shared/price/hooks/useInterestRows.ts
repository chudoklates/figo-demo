import { useContext } from "react";
import { Row } from "../types";
import { UserContext } from "@/lib/context/UserContext";
import { getFieldOptions } from "@/utils/field";

export default function useInterestRows(length: number): Row[] {
  const { user } = useContext(UserContext);

  const preferredInterests = user?.preferred_categories || [];

  const interestsLabels =
    (user?.fields && getFieldOptions(user, "preferred_categories")) ?? [];

  const userInterests = interestsLabels
    .filter((interest) => preferredInterests.includes(interest.value))
    .map((interest) => interest.label)
    .slice(0, 3); // Max 3 interests

  if (userInterests.length === 1) {
    return [[[length, userInterests[0]]]];
  }

  if (userInterests.length === 2) {
    if (length % 2 !== 0) {
      return [
        [[length, userInterests[0]]],
        [
          [(length - 1) / 2, userInterests[0]],
          [(length + 1) / 2, userInterests[1]],
        ],
      ];
    }

    return [
      [[length, userInterests[0]]],
      [
        [length / 2, userInterests[0]],
        [length / 2, userInterests[1]],
      ],
    ];
  }

  if (userInterests.length === 3) {
    if (length === 2) {
      return [
        [[length, userInterests[0]]],
        [
          [1, userInterests[1]],
          [1, userInterests[2]],
        ],
      ];
    }

    if (length === 3) {
      return [
        [[length, userInterests[0]]],
        [
          [2, userInterests[1]],
          [1, userInterests[2]],
        ],
      ];
    }

    if (length === 4) {
      return [
        [[length, userInterests[0]]],
        [
          [2, userInterests[0]],
          [1, userInterests[2]],
        ],
        [[1, userInterests[1]]],
      ];
    }

    if (length === 5) {
      return [
        [[length, userInterests[0]]],
        [
          [2, userInterests[2]],
          [2, userInterests[0]],
        ],
        [[1, userInterests[1]]],
      ];
    }

    if (length === 8) {
      return [
        [[length, userInterests[0]]],
        [
          [3, userInterests[2]],
          [3, userInterests[0]],
        ],
        [[2, userInterests[1]]],
      ];
    }

    if (length === 10) {
      return [
        [[length, userInterests[0]]],
        [
          [4, userInterests[0]],
          [4, userInterests[1]],
        ],
        [[2, userInterests[2]]],
      ];
    }
  }

  return [];
}
