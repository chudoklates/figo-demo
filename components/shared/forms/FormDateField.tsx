"use client";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { useField } from "formik";
import { DateField, DateFieldProps } from "@mui/x-date-pickers/DateField";
import { Dayjs } from "dayjs";

interface FormDateFieldProps extends Omit<DateFieldProps<Dayjs>, "name"> {
  name: string;
  label: string;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  helperText?: string;
}

export default function FormDateField({
  name,
  helperText,
  label,
  error,
  required,
  fullWidth,
  ...props
}: FormDateFieldProps) {
  const [field, meta, { setValue }] = useField<Dayjs | null>(name);

  const handleChange = (value: Dayjs | null) => {
    if (value && !value.isValid()) return;
    setValue(value);
  };

  const showError = error || (meta.touched && !!meta.error);

  return (
    <FormControl variant="standard" fullWidth={fullWidth}>
      <InputLabel
        shrink
        htmlFor={name}
        disableAnimation
        required={required}
        error={showError}
      >
        {label}
      </InputLabel>
      <DateField
        slotProps={{
          textField: {
            id: name,
            "aria-describedby": `${name}-helper-text`,
            error: showError,
          },
        }}
        clearable
        name={name}
        aria-describedby={`${name}-helper-text`}
        value={field.value}
        onChange={handleChange}
        onBlur={field.onBlur}
        onClear={() => setValue(null)}
        {...props}
      />
      <FormHelperText error={showError} id={`${name}-helper-text`}>
        {showError ? meta.error : helperText || " "}
      </FormHelperText>
    </FormControl>
  );
}
