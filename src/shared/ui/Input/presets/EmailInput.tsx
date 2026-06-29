import { InputField } from '../InputField';
import { validateEmail } from '../validators';
import type { PresetInputProps } from '../types';

export const EmailInput = ({ value, onChange, ...props }: PresetInputProps) => (
	<InputField
		value={value}
		onChange={onChange}
		label="Email"
		type="email"
		placeholder="example@mail.com"
		validate={validateEmail}
		inputMode="text"
		{...props}
	/>
);