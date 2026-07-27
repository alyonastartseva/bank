import { InputField } from "../InputField";
import { formatAmount, parseAmount } from "../masks";
import type { PresetInputProps } from "../types";

interface AmountInputProps extends PresetInputProps {
  currency?: string;
}

export const AmountInput = ({
  value,
  onChange,
  currency = "$",
  ...props
}: AmountInputProps) => (
  <InputField
    value={value}
    onChange={onChange}
    label="Сумма"
    placeholder="0.00"
    formatValue={formatAmount}
    parseValue={parseAmount}
    inputMode="decimal"
    startAdornment={currency}
    {...props}
  />
);
