import { TransactionStatus } from "../model/transactionStatus";

export interface TransactionResponse {
  id: string;
  sourceAccountId: string;
  targetAccountId: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  createdAt: string;
  description: string;
}

export interface TransactionPageResponse {
  content: TransactionResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CreateTransactionRequest {
  idempotencyKey: string;
  sourceAccountId: string;
  targetAccountId: string;
  amount: number;
  currency: string;
  description: string;
}

export interface TransactionFilters {
  page: number;
  size: number;
  accountId?: string;
  status?: TransactionStatus;
}
