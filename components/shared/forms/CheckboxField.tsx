"use client";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

import { useField } from "formik";

interface CheckboxFieldProps extends Omit<CheckboxProps, "name"> {
  name: string;
  label: React.ReactNode;
  helperText?: string;
  error?: boolean;
}

export default function CheckboxField({
  name,
  helperText,
  label,
  error,
  ...props
}: CheckboxFieldProps) {
  const [field, meta, { setValue }] = useField<boolean>(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  const showError = error || (meta.touched && !!meta.error);

  return (
    <FormControl variant="standard" error={showError}>
      <FormControlLabel
        control={
          <Checkbox
            id={name}
            aria-describedby={`${name}-helper-text`}
            value={field.value}
            onChange={handleChange}
            onBlur={field.onBlur}
            {...props}
          />
        }
        label={label}
      />
      <FormHelperText error={showError} id={`${name}-helper-text`}>
        {(showError && meta.error) || " "}
      </FormHelperText>
    </FormControl>
  );
}
