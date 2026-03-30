export interface Account {
  id: string;
  accountNumber: string;
  userId: string;
  balance: number;
  currency: string;
  status: "active" | "blocked";
  createdAt: string;
}
