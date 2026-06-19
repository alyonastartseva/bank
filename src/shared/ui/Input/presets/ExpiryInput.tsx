import { InputField } from '../InputField';
import { formatExpiry, parseExpiry } from '../masks';
import { validateExpiry } from '../validators';
import type { PresetInputProps } from '../types';

export const ExpiryInput = ({ value, onChange, ...props }: PresetInputProps) => (
	<InputField
		value={value}
		onChange={onChange}
		label="Срок действия"
		placeholder="MM/YY"
		formatValue={formatExpiry}
		parseValue={parseExpiry}
		validate={validateExpiry}
		maxLength={5}
		inputMode="numeric"
		{...props}
	/>
);