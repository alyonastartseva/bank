/**
 * Алгоритм Луна для проверки номера карты
 */
export const validateCard = (value: string): { isValid: boolean; errorText?: string } => {
	const digits = value.replace(/\D/g, '');
	if (digits.length !== 16) {
		return { isValid: false, errorText: 'Номер карты должен содержать 16 цифр' };
	}
	
	let sum = 0;
	let shouldDouble = false;
	for (let i = digits.length - 1; i >= 0; i--) {
		let digit = parseInt(digits[i], 10);
		if (shouldDouble) {
			digit *= 2;
			if (digit > 9) digit -= 9;
		}
		sum += digit;
		shouldDouble = !shouldDouble;
	}
	const isValid = sum % 10 === 0;
	return { isValid, errorText: isValid ? undefined : 'Неверный номер карты' };
};

/**
 * Простая валидация email
 */
export const validateEmail = (value: string): { isValid: boolean; errorText?: string } => {
	if (!value) return { isValid: true };
	const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
	const isValid = emailRegex.test(value);
	return { isValid, errorText: isValid ? undefined : 'Введите корректный email' };
};

/**
 * Проверка, что поле не пустое (для обязательных полей)
 */
export const validateRequired = (value: string): { isValid: boolean; errorText?: string } => {
	const isValid = value.trim().length > 0;
	return { isValid, errorText: isValid ? undefined : 'Поле обязательно для заполнения' };
};

/**
 * Валидация имени:
 * - только буквы, пробелы и дефисы
 * - минимум 2 символа
 * - максимум 30 символов
 */
export const validateName = (value: string): { isValid: boolean; errorText?: string } => {
  if (!value) return { isValid: true };

  const trimmed = value.trim();

  if (trimmed.length < 2) {
    return { isValid: false, errorText: 'Имя должно содержать минимум 2 символа' };
  }

  if (trimmed.length > 30) {
    return { isValid: false, errorText: 'Имя не должно превышать 30 символов' };
  }

  const nameRegex = /^[a-zA-Zа-яА-Я\s-]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, errorText: 'Имя должно содержать только буквы, пробелы и дефисы' };
  }

  return { isValid: true };
};

/**
 * Валидация телефона:
 * - 11 цифр
 * - начинается с 8 или 7
 */
export const validatePhone = (value: string): { isValid: boolean; errorText?: string } => {
  if (!value) return { isValid: true };

  const digits = value.replace(/\D/g, '');

  if (digits.length === 0) return { isValid: true };

  if (digits.length !== 11) {
    return {
      isValid: false,
      errorText: 'Номер телефона должен содержать 11 цифр'
    };
  }

  const firstDigit = digits[0];
  if (firstDigit !== '8' && firstDigit !== '7') {
    return {
      isValid: false,
      errorText: 'Номер должен начинаться с 8 или 7'
    };
  }

  return { isValid: true };
};

/**
 * Проверка сложности пароля:
 * - минимум 6 символов
 * - хотя бы одна буква
 * - хотя бы одна цифра
 */
export const validatePasswordStrength = (value: string): { isValid: boolean; errorText?: string } => {
  if (!value) return { isValid: true };

  const hasMinLength = value.length >= 6;
  const hasLetter = /[a-zA-Zа-яА-Я]/.test(value);
  const hasDigit = /\d/.test(value);

  if (!hasMinLength) {
    return {
      isValid: false,
      errorText: 'Пароль должен содержать минимум 6 символов',
    };
  }

  if (!hasLetter) {
    return {
      isValid: false,
      errorText: 'Пароль должен содержать хотя бы одну букву',
    };
  }

  if (!hasDigit) {
    return {
      isValid: false,
      errorText: 'Пароль должен содержать хотя бы одну цифру',
    };
  }

  return { isValid: true };
};

/**
 * Комбинированная валидация для пароля
 * Объединяет validateRequired и validatePasswordStrength
 */
export const validatePassword = (value: string): { isValid: boolean; errorText?: string } => {
  const required = validateRequired(value);
  if (!required.isValid) return required;

  const strength = validatePasswordStrength(value);
  if (!strength.isValid) return strength;

  return { isValid: true };
};

/**
 * Проверка, что пароль не совпадает с текущим
 */
export const validateNotSameAsCurrent = (currentPassword: string) => {
  return (value: string): { isValid: boolean; errorText?: string } => {
    if (!value || !currentPassword) return { isValid: true };
    const isValid = value !== currentPassword;
    return {
      isValid,
      errorText: isValid ? undefined : 'Новый пароль не должен совпадать с текущим'
    };
  };
};

/**
 * Проверка, что пароли совпадают
 */
export const validatePasswordMatch = (password: string) => {
  return (value: string): { isValid: boolean; errorText?: string } => {
    if (!value || !password) return { isValid: true };
    const isValid = value === password;
    return {
      isValid,
      errorText: isValid ? undefined : 'Пароли не совпадают'
    };
  };
};

/**
 * Проверка срока действия (не просрочен)
 * Принимает строку в формате MMYY (цифры)
 */
export const validateExpiry = (value: string): { isValid: boolean; errorText?: string } => {
	const digits = value.replace(/\D/g, '');
	if (digits.length !== 4) {
		return { isValid: false, errorText: 'Введите месяц и год (MM/YY)' };
	}
	const month = parseInt(digits.slice(0, 2), 10);
	const year = parseInt(digits.slice(2), 10);
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear() % 100;
	const currentMonth = currentDate.getMonth() + 1;
	
	if (month < 1 || month > 12) {
		return { isValid: false, errorText: 'Месяц должен быть от 01 до 12' };
	}
	if (year < currentYear || (year === currentYear && month < currentMonth)) {
		return { isValid: false, errorText: 'Срок действия истёк' };
	}
	return { isValid: true };
};