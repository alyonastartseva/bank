import { InputField } from "../InputField";
import type { PresetInputProps } from "../types";
import { parseDate } from "@/shared/ui/Input/masks.ts";

export const DateInput = ({ value, onChange, ...props }: PresetInputProps) => (
  <InputField
    value={value}
    onChange={onChange}
    type="text"
    placeholder="ДД ММ ГГГГ"
    parseValue={parseDate}
    maxLength={11}
    inputMode="numeric"
    {...props}
  />
);
