import { useLocation } from "react-router-dom";
import { TransferBetweenAccounts } from "@/features/transfer-between-accounts";

interface TransferNavigationState {
  amount?: string;
}

export default function TransferBetweenAccountsPage() {
  const location = useLocation();
  const navigationState = location.state as TransferNavigationState | null;

  return <TransferBetweenAccounts amount={navigationState?.amount ?? "36.00"} />;
}
