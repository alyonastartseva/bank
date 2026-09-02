import { cardMock } from "@/widgets/card/cardMock";
import type { cardType } from "@/shared/types/cardType";

export type TransferCard = cardType & { balance: string };

export const transferCards: TransferCard[] = [
  { ...cardMock, balance: "2 458,65" },
  {
    id: "card-2",
    number: "5412751234567890",
    holder: "AR Jonson",
    expiryDate: "12/2028",
    cvv: "123",
    brand: "mastercard",
    balance: "1 200,00",
  },
  {
    id: "card-3",
    number: "4000123412341234",
    holder: "AR Jonson",
    expiryDate: "08/2029",
    cvv: "456",
    brand: "mastercard",
    balance: "5 430,00",
  },
];
