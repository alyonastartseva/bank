import { VirtualScroll } from "@/shared/ui/VirtualScroll/VirtualScroll";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem";
import type { Transaction } from "@/shared/types/typesReducer";

interface TransactionScrollProps {
  transactions: Transaction[];
  emptyMessage?: string;
}

export const TransactionScroll = ({ transactions, emptyMessage }: TransactionScrollProps) => {
  if (!transactions.length) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <VirtualScroll
      data={transactions}
      heightOfItem={42}
      heightOfContainer={400}
      marginBottom={22}
      renderItem={(transaction: Transaction) => (
        <TransactionItem
          key={transaction.id}
          icon={transaction.icon}
          name={transaction.name}
          category={transaction.category}
          price={transaction.price}
        />
      )}
    />
  );
};