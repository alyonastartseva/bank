import { InputField } from '../InputField';
import { formatCardNumber, parseCardNumber } from '../masks';
import { validateCard } from '../validators';
import type { PresetInputProps } from '../types';

export const CardNumberInput = ({ value, onChange, ...props }: PresetInputProps) => (
	<InputField
		value={value}
		onChange={onChange}
		label="Номер карты"
		placeholder="0000 0000 0000 0000"
		formatValue={formatCardNumber}
		parseValue={parseCardNumber}
		validate={validateCard}
		maxLength={19}
		inputMode="numeric"
		{...props}
	/>
);
