import React, { useState } from 'react';  // useEffect больше не нужен
import { InputAdornment } from '@mui/material';
import { StyledTextField } from './InputField.styles';

export type FormatFunction = (value: string) => string;
export type ParseFunction = (formatted: string) => string;
export type ValidateFunction = (value: string) => { isValid: boolean; errorText?: string };

export interface InputFieldProps {
	value: string;
	onChange: (value: string) => void;
	label?: string;
	placeholder?: string;
	error?: boolean;
	helperText?: string;
	required?: boolean;
	disabled?: boolean;
	type?: 'text' | 'email' | 'number' | 'password';
	inputMode?: 'text' | 'numeric' | 'decimal' | 'tel';
	maxLength?: number;
	formatValue?: FormatFunction;
	parseValue?: ParseFunction;
	validate?: ValidateFunction;
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
	helperText: externalHelperText = '',
	required = false,
	disabled = false,
	type = 'text',
	inputMode = 'text',
	maxLength,
	formatValue,
	parseValue,
	validate,
	startAdornment,
	endAdornment,
	...rest
}) => {
	const [isTouched, setIsTouched] = useState(false);

	const displayValue = formatValue ? formatValue(value) : value;

	let internalError = false;
	let internalHelperText = '';
	if (validate) {
		const { isValid, errorText } = validate(value);
		internalError = !isValid;
		internalHelperText = errorText || '';
	}

	const showError = externalError || (isTouched && internalError);
	const showHelperText = externalHelperText || (isTouched ? internalHelperText : '');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		const parsed = parseValue ? parseValue(raw) : raw;
		onChange(parsed);
	};

	const handleBlur = () => {
		setIsTouched(true);
	};

	return (
		<StyledTextField
			onBlur={handleBlur}
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
			{...rest}
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