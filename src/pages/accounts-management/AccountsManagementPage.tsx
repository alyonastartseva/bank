import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAccountByIdQuery,
  useBlockAccountMutation,
} from "@/entities/account/api/account-api";
import AccountCard from "@/entities/account/ui/AccountCard/AccountCard.tsx";
import { AddAccountModal } from "@/features/add-account/AddAccountModal/AddAccountModal";
import styles from "./AccountsManagementPage.module.css";

const AccountsManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const [accountId, setAccountId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [blockingId, setBlockingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: account,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAccountByIdQuery(accountId, {
    skip: !accountId,
  });

  const [blockAccount] = useBlockAccountMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleLoadAccount = () => {
    if (searchInput.trim()) {
      setAccountId(searchInput.trim());
    }
  };

  const handleBlockAccount = async (id: string) => {
    setBlockingId(id);
    try {
      await blockAccount({ id }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Failed to block account:", err);
      alert(t("errors.blockAccountFailed") || "Ошибка при блокировке счета");
    } finally {
      setBlockingId(null);
    }
  };

  const handleAccountCreated = async (accountData: {
    userId: string;
    accountNumber: string;
    balance: number;
    currency: string;
    accountType: string;
  }) => {
    console.log("Account created:", accountData);
  };

  let errorMessage = null;
  if (isError && error) {
    if ("status" in error) {
      const fetchError = error as { status: number; data?: { message?: string } };
      errorMessage = fetchError.data?.message || JSON.stringify(fetchError.data);
    } else if ("message" in error) {
      errorMessage = error.message;
    } else {
      errorMessage = t("errors.unknown");
    }
  }

  const handleCreateAccount = async (data: {
    userId: string;
    accountNumber: string;
    balance: number;
    currency: string;
    accountType: string;
  }) => {
    console.log("Creating account:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.createBlock}>
        <button className={styles.createButton} onClick={() => setIsModalOpen(true)}>
          {t("accountsManagement.createAccount")}
        </button>
      </div>

      <AddAccountModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateAccount={handleCreateAccount}
        onSuccess={handleAccountCreated}
      />

      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder={t("accountsManagement.searchPlaceholder")}
          className={styles.searchInput}
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button className={styles.loadButton} onClick={handleLoadAccount}>
          {t("accountsManagement.load") || "Загрузить"}
        </button>
      </div>

      {isLoading && (
        <div className={styles.loader}>{t("common.loading") || "Загрузка..."}</div>
      )}
      {isError && <div className={styles.error}>Ошибка: {errorMessage}</div>}

      {account && (
        <div className={styles.accountContainer}>
          <AccountCard
            id={account.id}
            accountNumber={account.accountNumber}
            userId={String(account.userId)}
            balance={account.balance.toString()}
            currency={account.currency}
            status={account.status}
            createdAt={account.createdAt}
            onBlock={() => handleBlockAccount(account.id)}
            disabled={blockingId === account.id}
          />

        </div>
      )}
    </div>
  );
};

export default AccountsManagementPage;
