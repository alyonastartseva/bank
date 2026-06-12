import type { InputFieldProps } from './InputField';

/**
 * Базовый тип для всех пресетов.
 * Все поля InputFieldProps опциональны, кроме обязательных value и onChange.
 */
export type PresetInputProps = Omit<Partial<InputFieldProps>, 'value' | 'onChange'> & {
	value: string;
	onChange: (value: string) => void;
};