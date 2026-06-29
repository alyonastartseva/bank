export interface Account {
  id: string;
  accountId: number;
  externalId: string;
  accountNumber: string;
  userId: number;
  initialBalance: number;
  balance: number;
  currency: string;
  status: "active" | "blocked";
  createdAt: string;
  message?: string;
}

export interface CreateAccountRequest {
  userId: string;
  initialBalance: number;
  currency: "RUB" | "USD" | "EUR";
  accountType: "CHECKING" | "SAVINGS" | "DEPOSIT" | "CREDIT";
}

export interface BalanceResponse {
  accountId: string;
  balance?: number;
  currency: string;
  lastUpdated: string;
  amount: number;
}