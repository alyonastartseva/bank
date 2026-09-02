import { useTranslation } from "react-i18next";
import { CardTransferForm } from "@/features/card-transfer";
import TransferPageLayout from "@/widgets/transfer-page-layout";

export default function CardTransferPage() {
  const { t } = useTranslation();

  return (
    <TransferPageLayout title={t("cardTransfer.title")}>
      <CardTransferForm />
    </TransferPageLayout>
  );
}
