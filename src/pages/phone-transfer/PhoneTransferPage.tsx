import { useTranslation } from "react-i18next";
import { PhoneTransferForm } from "@/features/phone-transfer";
import TransferPageLayout from "@/widgets/transfer-page-layout";

export default function PhoneTransferPage() {
  const { t } = useTranslation();

  return (
    <TransferPageLayout title={t("phoneTransfer.title")}>
      <PhoneTransferForm />
    </TransferPageLayout>
  );
}
