"use client";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useField } from "formik";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { ReactNode } from "react";

interface FormSelectFieldProps extends Omit<SelectProps, "name"> {
  name: string;
  label?: string;
  helperText?: string;
  options: {
    label: string;
    value: string | number | readonly string[] | undefined;
    disabled?: boolean;
  }[];
}

export default function FormSelect({
  name,
  options,
  multiple,
  helperText,
  label,
  error,
  onChange,
  ...props
}: FormSelectFieldProps) {
  const [field, meta, { setValue }] = useField<string[] | string>(name);

  const handleChange = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => {
    onChange?.(event, child);

    if (multiple && Array.isArray(field.value)) {
      const isSelected = field.value.some(
        (value) => value === event.target.value
      );

      setValue(
        isSelected
          ? field.value.filter((value) => value !== event.target.value)
          : [...field.value, event.target.value as string]
      );

      return;
    }

    setValue(event.target.value as string);
  };

  const showError = error || (meta.touched && !!meta.error);

  return (
    <FormControl variant="standard" fullWidth={props.fullWidth}>
      {label && (
        <InputLabel
          shrink
          htmlFor={name}
          disableAnimation
          required={props.required}
          error={showError}
        >
          {label}
        </InputLabel>
      )}
      <Select
        id={name}
        variant="outlined"
        aria-describedby={`${name}-helper-text`}
        error={showError}
        value={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        {...props}
      >
        {options.map((option, i) => (
          <MenuItem
            key={
              typeof option.value === "string" ? option.value : `option:${i}`
            }
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={showError} id={`${name}-helper-text`}>
        {showError ? meta.error : helperText || " "}
      </FormHelperText>
    </FormControl>
  );
}
