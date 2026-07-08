import { InputField } from "../InputField";
import type { PresetInputProps } from "../types";

export const TextInput = ({ value, onChange, ...props }: PresetInputProps) => (
  <InputField value={value} onChange={onChange} type="text" {...props} />
);
