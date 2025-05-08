"use client";

import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MuiTelInput, MuiTelInputProps, MuiTelInputInfo } from "mui-tel-input";

import { useField } from "formik";

interface FormPhoneFieldProps extends Omit<MuiTelInputProps, "name"> {
  name: string;
  label?: string;
  helperText?: string;
}

export default function FormPhoneField({
  name,
  helperText,
  label,
  error,
  sx,
  onBlur,
  ...props
}: FormPhoneFieldProps) {
  const [field, meta, { setValue }] = useField<string | null>(name);

  const handleChange = (value: string, _info: MuiTelInputInfo) => {
    setValue(value.split("+49")[1] === "" ? null : value.replaceAll(" ", ""));
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
      <MuiTelInput
        id={name}
        aria-describedby={`${name}-helper-text`}
        error={showError}
        value={field.value || ""}
        onChange={handleChange}
        onBlur={(e) => {
          field.onBlur(e);
          onBlur?.(e);
        }}
        defaultCountry="DE"
        onlyCountries={["DE"]}
        langOfCountryName="de"
        disableDropdown
        {...props}
        forceCallingCode
      />
      <FormHelperText error={showError} id={`${name}-helper-text`}>
        {showError ? meta.error : helperText || " "}
      </FormHelperText>
    </FormControl>
  );
}
