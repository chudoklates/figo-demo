"use client";

import React from "react";
import { Add, Cancel } from "@mui/icons-material";
import { Chip, FormHelperText, Stack } from "@mui/material";
import { useField } from "formik";

export default function InterestsField({
  options,
}: {
  options: { value: string; label: string }[];
}) {
  const [field, { error, touched }, { setValue, setTouched }] =
    useField<string[]>("interests");

  return (
    <React.Fragment>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 2,
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {options.map((interest) => {
          const selected = field.value.includes(interest.value);

          return (
            <Chip
              clickable
              onClick={() => {
                setTouched(true);
                setValue(
                  selected
                    ? field.value.filter((i) => i !== interest.value)
                    : [...field.value, interest.value]
                );
              }}
              variant={selected ? "filled" : "outlined"}
              key={interest.value}
              label={interest.label}
              icon={selected ? <Cancel /> : <Add />}
            />
          );
        })}
      </Stack>
      {touched && error ? <FormHelperText error>{error}</FormHelperText> : null}
    </React.Fragment>
  );
}
