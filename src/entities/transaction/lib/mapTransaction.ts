import moneyTransfer from "@/shared/icons/moneyTransfer.svg";
import { formatCurrency } from "./formatCurrency";

import type { TransactionResponse } from "../model/transaction.types";
import type { TransactionViewModel } from "../model/transactionViewModel";

export const mapTransaction = (dto: TransactionResponse): TransactionViewModel => {
  return {
    id: dto.id,
    icon: moneyTransfer,
    name: dto.description || "Банковский перевод",
    category: "Транзакция",
    price: formatCurrency(dto.amount, dto.currency),
  };
};
