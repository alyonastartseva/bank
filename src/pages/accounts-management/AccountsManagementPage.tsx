import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AccountsManagementPage.module.css';
import AccountCard from '@/entities/account/ui/AccountCard'; 


const mockAccount = {
  id: 'ACC-12345',
  accountNumber: '40817810099910004321',
  userId: 'USER-789',
  balance: '1250.50',
  currency: 'USD',
  status: 'active' as const,
  createdAt: '2024-03-15',
};

const AccountsManagementPage: React.FC = () => {
  const { t } = useTranslation();

 
  const handleCreateAccount = () => {
    console.log('Create account clicked');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Searching for account ID:', event.target.value);
  };

  const handleBlockAccount = () => {
    console.log('Block account clicked');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('accountsManagement.title')}</h1>
      </div>

      <div className={styles.actions}>
        <button className={styles.createButton} onClick={handleCreateAccount}>
          {t('accountsManagement.createAccount')}
        </button>
        <input
          type="text"
          placeholder={t('accountsManagement.searchPlaceholder')}
          className={styles.searchInput}
          onChange={handleSearch}
        />
      </div>

      
      <AccountCard
        id={mockAccount.id}
        accountNumber={mockAccount.accountNumber}
        userId={mockAccount.userId}
        balance={mockAccount.balance}
        currency={mockAccount.currency}
        status={mockAccount.status}
        createdAt={mockAccount.createdAt}
        onBlock={handleBlockAccount}
      />
    </div>
  );
};

export default AccountsManagementPage;