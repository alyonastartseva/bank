import { InputField } from '../InputField';
import type { PresetInputProps } from '../types';

export const PasswordInput = ({ value, onChange, ...props }: PresetInputProps) => (
	<InputField
		value={value}
		onChange={onChange}
		label="Пароль"
		type="password"
		placeholder="Введите пароль"
		{...props}
	/>
);