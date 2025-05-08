import { MappedActivity } from "@/api/types/activities";
import { ListSubheader, MenuItem, Select, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SortFunction, SortGroup } from "../types";

const SORT_GROUPS: SortGroup[] = [
  {
    label: "Relevanz",
    options: [
      {
        label: "Relevanz",
        value: "relevance",
        sortMethod: (a, b) => b.score - a.score,
      },
    ],
  },
  {
    label: "Nächster Ort",
    options: [
      {
        label: "Nächster Ort",
        value: "distance-asc",
        sortMethod: (a, b) => a.distance - b.distance,
      },
    ],
  },
  {
    label: "Datum",
    options: [
      {
        label: "Frühester Termin",
        value: "date-asc",
        sortMethod: (a, b) => a.startDate.getTime() - b.startDate.getTime(),
      },
      {
        label: "Spätester Termin",
        value: "date-desc",
        sortMethod: (a, b) => b.startDate.getTime() - a.startDate.getTime(),
      },
    ],
  },
];

const SORT_OPTIONS = SORT_GROUPS.flatMap((group) => group.options);

const SortValue = (value: string) => {
  return (
    <Typography
      sx={{
        fontSize: { xs: 16, md: 18 },
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <span>Sort. nach:</span>{" "}
      <strong>
        {SORT_OPTIONS.find((option) => option.value === value)?.label ||
          "Relevanz"}
      </strong>
    </Typography>
  );
};

export default function CatalogueSort({
  setSortMethod,
}: {
  setSortMethod: Dispatch<SetStateAction<SortFunction<MappedActivity>>>;
}) {
  const [sortOption, setSortOption] = useState(SORT_GROUPS[0].options[0]);

  useEffect(() => {
    setSortMethod(() => sortOption.sortMethod);
  }, [sortOption, setSortMethod]);

  return (
    <Select
      value={sortOption.value}
      onChange={(event) => {
        const selectedOption = SORT_OPTIONS.find(
          (option) => option.value === event.target.value
        );
        if (selectedOption) {
          setSortOption(selectedOption);
        }
      }}
      renderValue={SortValue}
      sx={(theme) => ({
        borderRadius: "20px",
        backgroundColor: "white",
        width: { xs: 220, md: 280 },
        "& .MuiSelect-select": {
          [theme.breakpoints.down("md")]: {
            padding: 0,
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
          [theme.breakpoints.down("md")]: {
            border: "none",
          },
        },
      })}
    >
      {SORT_GROUPS.map((group, i) =>
        group.options.length === 1 ? (
          <MenuItem key={group.label} value={group.options[0].value}>
            {group.label}
          </MenuItem>
        ) : (
          [
            <ListSubheader key={group.label}>{group.label}</ListSubheader>,
            group.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            )),
          ]
        )
      )}
    </Select>
  );
}
