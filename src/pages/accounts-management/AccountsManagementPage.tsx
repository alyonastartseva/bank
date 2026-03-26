import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGetAccountByIdQuery,
  useCreateAccountMutation,
  useBlockAccountMutation,
} from '@/entities/account/api/account-api';
import AccountCard from '@/entities/account/ui/AccountCard';
import styles from './AccountsManagementPage.module.css';

const AccountsManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const [accountId, setAccountId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [blockingId, setBlockingId] = useState<string | null>(null);

  const { data: account, isLoading, isError, error } = useGetAccountByIdQuery(accountId, {
    skip: !accountId,
  });

  const [createAccount] = useCreateAccountMutation();
  const [blockAccount] = useBlockAccountMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleLoadAccount = () => {
    if (searchInput.trim()) {
      setAccountId(searchInput.trim());
    }
  };

  // Создание тестового счета (данные фиксированы)
  const handleCreateTestAccount = async () => {
    try {
      const result = await createAccount({
        accountNumber: `TEST-${Date.now()}`,
        userId: '1', 
        balance: 100,
        currency: 'USD',
        status: 'active',
      }).unwrap();
      setSearchInput(result.id);
      setAccountId(result.id);
      alert(t('accountsManagement.accountCreated') || 'Счет создан');
    } catch (err) {
      console.error('Failed to create account:', err);
      alert(t('errors.createAccountFailed') || 'Ошибка при создании счета');
    }
  };

  const handleBlockAccount = async (id: string) => {
    setBlockingId(id);
    try {
      await blockAccount({ id }).unwrap();
      setAccountId(id);
    } catch (err) {
      console.error('Failed to block account:', err);
      alert(t('errors.blockAccountFailed') || 'Ошибка при блокировке счета');
    } finally {
      setBlockingId(null);
    }
  };

  let errorMessage = null;
  if (isError && error) {
    if ('status' in error) {
      const fetchError = error as { status: number; data?: { message?: string } };
      errorMessage = fetchError.data?.message || JSON.stringify(fetchError.data);
    } else if ('message' in error) {
      errorMessage = error.message;
    } else {
      errorMessage = t('errors.unknown');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('accountsManagement.title')}</h1>
      </div>

      <div className={styles.createBlock}>
        <button className={styles.createButton} onClick={handleCreateTestAccount}>
          {t('accountsManagement.createAccount')}
        </button>
      </div>

      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder={t('accountsManagement.searchPlaceholder')}
          className={styles.searchInput}
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button className={styles.loadButton} onClick={handleLoadAccount}>
          {t('accountsManagement.load') || 'Загрузить'}
        </button>
      </div>

      {isLoading && <div className={styles.loader}>{t('common.loading') || 'Загрузка...'}</div>}
      {isError && <div className={styles.error}>Ошибка: {errorMessage}</div>}

      {account && (
        <AccountCard
          id={account.id}
          accountNumber={account.accountNumber}
          userId={account.userId}
          balance={account.balance.toString()}
          currency={account.currency}
          status={account.status}
          createdAt={account.createdAt}
          onBlock={() => handleBlockAccount(account.id)}
          disabled={blockingId === account.id}
        />
      )}
    </div>
  );
};

export default AccountsManagementPage;