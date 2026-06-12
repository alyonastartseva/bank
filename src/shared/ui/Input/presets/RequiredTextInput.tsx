import { InputField } from '../InputField';
import { validateRequired } from '../validators';
import type { PresetInputProps } from '../types';

export const RequiredTextInput = ({ value, onChange, ...props }: PresetInputProps) => (
	<InputField
		value={value}
		onChange={onChange}
		type="text"
		validate={validateRequired}
		{...props}
	/>
);