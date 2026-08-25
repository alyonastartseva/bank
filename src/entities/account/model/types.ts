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

export interface GetMyAccountsQueryParams {
  userId?: number;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface AccountPageResponse {
  content: Account[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
