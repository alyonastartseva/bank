import type { CurrencyCode } from "@/entities/currency";

export interface TransferAccount {
  id: string;
  brand: "Mastercard" | "Visa";
  lastFourDigits: string;
  currency: CurrencyCode;
  balance: number;
}
