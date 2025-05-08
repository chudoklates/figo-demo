"use client";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { InputProps } from "@mui/material/Input";

import { useField } from "formik";
import OutlinedInput from "@mui/material/OutlinedInput";

interface FormFieldProps extends Omit<InputProps, "name"> {
  name: string;
  label?: string;
  helperText?: string;
}

export default function FormField({
  name,
  helperText,
  label,
  error,
  sx,
  onBlur,
  ...props
}: FormFieldProps) {
  const [field, meta, { setValue }] = useField<string>(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const showError = error || (meta.touched && !!meta.error);

  return (
    <FormControl variant="standard" fullWidth={props.fullWidth} sx={sx}>
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
      <OutlinedInput
        id={name}
        aria-describedby={`${name}-helper-text`}
        error={showError}
        value={field.value}
        onChange={handleChange}
        onBlur={(e) => {
          field.onBlur(e);
          onBlur?.(e);
        }}
        {...props}
      />
      <FormHelperText error={showError} id={`${name}-helper-text`}>
        {showError ? meta.error : helperText || " "}
      </FormHelperText>
    </FormControl>
  );
}
