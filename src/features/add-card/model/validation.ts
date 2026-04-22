export const validateCardNumber = (value: string): boolean => {
  const digits = value.replace(/\s/g, '');
  return /^\d{16}$/.test(digits);
};

export const validateExpiryDate = (value: string): boolean => {
  return /^(0[1-9]|1[0-2])\/(2[4-9]|[3-9][0-9])$/.test(value);
};

export const validateCardholderName = (value: string): boolean => {
  return value.trim().length >= 3;
};

export const validateCVV = (value: string): boolean => {
  const digits = value.replace(/\s/g, '');
  return /^\d{4}$/.test(digits);
};