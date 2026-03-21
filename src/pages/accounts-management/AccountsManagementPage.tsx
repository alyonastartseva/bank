import React from 'react';
import styles from './AccountsManagementPage.module.css';
import { useTranslation } from 'react-i18next';


const mockAccount = {
  id: 'ACC-12345',
  accountNumber: '40817810099910004321',
  userId: 'USER-789',
  balance: '1250.50',
  currency: 'USD',
  status: 'active', 
  createdAt: '2024-03-15',
};

const AccountsManagementPage: React.FC = () => {
  const { t } = useTranslation();

  // просто заглушка
  const handleCreateAccount = () => {
    console.log('Create account clicked');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Searching for account ID:', event.target.value);
  };

  const handleBlockAccount = () => {
    console.log('Block account clicked');
  };

  const statusText = mockAccount.status === 'active'
    ? t('accountsManagement.statusActive')
    : t('accountsManagement.statusBlocked');

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

      {/* Карточка */}
      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>{t('accountsManagement.accountId')}:</span>
          <span className={styles.value}>{mockAccount.id}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('accountsManagement.accountNumber')}:</span>
          <span className={styles.value}>{mockAccount.accountNumber}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('accountsManagement.userId')}:</span>
          <span className={styles.value}>{mockAccount.userId}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('accountsManagement.balance')}:</span>
          <span className={styles.value}>{mockAccount.balance} {mockAccount.currency}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('accountsManagement.currency')}:</span>
          <span className={styles.value}>{mockAccount.currency}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('accountsManagement.status')}:</span>
          <span className={`${styles.status} ${mockAccount.status === 'active' ? styles.statusActive : styles.statusBlocked}`}>
            {statusText}
          </span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('accountsManagement.createdAt')}:</span>
          <span className={styles.value}>{mockAccount.createdAt}</span>
        </div>
        <button className={styles.blockButton} onClick={handleBlockAccount}>
          {t('accountsManagement.block')}
        </button>
      </div>
    </div>
  );
};

export default AccountsManagementPage;