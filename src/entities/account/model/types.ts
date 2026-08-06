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

export type MyAccountStatus = "ACTIVE" | "BLOCKED" | "CLOSED";

export interface MyAccountResponse {
  externalId: string;
  balance: number;
  currency: string;
  status: MyAccountStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MyAccountsPageResponse {
  content: MyAccountResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
