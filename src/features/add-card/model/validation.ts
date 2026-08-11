const luhnCheck = (num: string): boolean => {
  let sum = 0;
  let shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export const validateCardNumber = (value: string): boolean => {
  const digits = value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(digits)) return false;
  return luhnCheck(digits);
};

export const validateExpiryDate = (value: string): boolean => {
  const trimmed = value.trim();
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmed)) return false;

  const [month, year] = trimmed.split('/').map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100; 
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
};

export const validateCardholderName = (value: string): boolean => {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  return /^[A-Za-zА-Яа-я\s.'-]+$/.test(trimmed);
};

export const validateCVV = (value: string): boolean => {
  const digits = value.replace(/\s/g, "");
  return /^\d{3,4}$/.test(digits);
};
