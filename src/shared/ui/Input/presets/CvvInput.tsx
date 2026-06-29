import type { PresetInputProps } from "@/shared/ui/Input/types.ts";
import { InputField } from "@/shared/ui/Input/InputField.tsx";
import { validateCVV } from "@/shared/ui/Input/validators.ts";

export const CvvInput = ({ value, onChange, ...props }: PresetInputProps) => (
  <InputField
    value={value}
    onChange={onChange}
    label="CVV"
    placeholder="1234"
    type="password"
    validate={validateCVV}
    maxLength={4}
    inputMode="numeric"
    InputLabelProps={{ shrink: true }}
    {...props}
  />
);
