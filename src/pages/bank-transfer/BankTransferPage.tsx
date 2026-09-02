import { useTranslation } from "react-i18next";
import { BankTransferForm } from "@/features/bank-transfer";
import TransferPageLayout from "@/widgets/transfer-page-layout";

export default function BankTransferPage() {
  const { t } = useTranslation();

  return (
    <TransferPageLayout
      title={t("bankTransfer.title")}
      subtitle={t("bankTransfer.subtitle")}
    >
      <BankTransferForm />
    </TransferPageLayout>
  );
}
