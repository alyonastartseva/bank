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