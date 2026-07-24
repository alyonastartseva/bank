export type CurrencyCode = "USD" | "EUR" | "GBP" | "CHF" | "JPY" | "CNY";

export type CurrencyItem = {
  code: CurrencyCode;
  nameKey: string;
  flagUrl: string;
};