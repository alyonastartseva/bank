import React from "react";
import { InputAdornment } from "@mui/material";
import { StyledTextField } from "./InputField.styles";

export type FormatFunction = (value: string) => string;
export type ParseFunction = (formatted: string) => string;
export type ValidateFunction = (value: string) => {
  isValid: boolean;
  errorText?: string;
};

export interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "number" | "password";
  inputMode?: "text" | "numeric" | "decimal" | "tel";
  maxLength?: number;
  formatValue?: FormatFunction;
  parseValue?: ParseFunction;
  validate?: (value: string) => { isValid: boolean; errorText?: string };
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  [key: string]: unknown;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  error: externalError = false,
  helperText: externalHelperText = "",
  required = false,
  disabled = false,
  type = "text",
  inputMode = "text",
  maxLength,
  formatValue,
  parseValue,
  startAdornment,
  endAdornment,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { validate, ...cleanRest } = rest;
  const displayValue = formatValue ? formatValue(value) : value;

  const showError = externalError;
  const showHelperText = externalHelperText;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = parseValue ? parseValue(raw) : raw;
    onChange(parsed);
  };

  return (
    <StyledTextField
      variant="standard"
      label={label}
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      error={showError}
      helperText={showHelperText}
      required={required}
      disabled={disabled}
      type={type}
      inputMode={inputMode}
      {...cleanRest}
      slotProps={{
        input: {
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
        },
        htmlInput: {
          maxLength,
        },
      }}
    />
  );
};
