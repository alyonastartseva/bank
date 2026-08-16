import type { TransferAccount } from "./types";

export const transferAccounts: TransferAccount[] = [
  {
    id: "account-usd",
    brand: "Mastercard",
    lastFourDigits: "4821",
    currency: "USD",
    balance: 2458.65,
  },
  {
    id: "account-eur",
    brand: "Visa",
    lastFourDigits: "1943",
    currency: "EUR",
    balance: 1214.43,
  },
];

export const USD_TO_EUR_RATE = 0.8574;
