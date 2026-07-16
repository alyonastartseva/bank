/**
 * Форматирует строку цифр в номер карты с пробелами каждые 4 символа
 * Пример: "1234567890123456" -> "1234 5678 9012 3456"
 */
export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

/**
 * Парсит отформатированный номер карты обратно в строку цифр
 */
export const parseCardNumber = (formatted: string): string => {
  return formatted.replace(/\s/g, "");
};

/**
 * Форматирует строку цифр в срок действия MM/YY
 * Пример: "1225" -> "12/25"
 */
export const formatExpiry = (value: string): string => {
  let digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    digits = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
};

/**
 * Парсит отформатированный срок действия в строку цифр
 */
export const parseExpiry = (formatted: string): string => {
  return formatted.replace(/\D/g, "");
};

/**
 * Форматирует сумму: разделитель тысяч — пробел, точка для копеек
 * Пример: "1234.56" -> "1 234.56"
 */
export const formatAmount = (value: string): string => {
  let cleaned = value.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) cleaned = parts[0] + "." + parts.slice(1).join("");
  if (parts[1] && parts[1].length > 2) cleaned = parts[0] + "." + parts[1].slice(0, 2);

  const [integer, fraction] = cleaned.split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return fraction !== undefined ? `${formattedInteger}.${fraction}` : formattedInteger;
};

/**
 * Парсит отформатированную сумму (с пробелами) в чистое число строкой
 * Удаляет пробелы и запятые (на всякий случай)
 */
export const parseAmount = (formatted: string): string => {
  return formatted.replace(/[\s,]/g, "");
};
