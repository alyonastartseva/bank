import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AccountCard.module.css';

interface AccountCardProps {
  id: string;
  accountNumber: string;
  userId: string;
  balance: string;
  currency: string;
  status: 'active' | 'blocked';
  createdAt: string;
  onBlock: () => void;
  disabled?: boolean;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  accountNumber,
  userId,
  balance,
  currency,
  status,
  createdAt,
  onBlock,
  disabled = false,
}) => {
  const { t } = useTranslation();

  const statusText =
    status === 'active'
      ? t('accountsManagement.statusActive')
      : t('accountsManagement.statusBlocked');

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <span className={styles.label}>{t('accountsManagement.accountId')}:</span>
        <span className={styles.value}>{id}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t('accountsManagement.accountNumber')}:</span>
        <span className={styles.value}>{accountNumber}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t('accountsManagement.userId')}:</span>
        <span className={styles.value}>{userId}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t('accountsManagement.balance')}:</span>
        <span className={styles.value}>
          {balance} {currency}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t('accountsManagement.currency')}:</span>
        <span className={styles.value}>{currency}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t('accountsManagement.status')}:</span>
        <span
          className={`${styles.status} ${
            status === 'active' ? styles.statusActive : styles.statusBlocked
          }`}
        >
          {statusText}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t('accountsManagement.createdAt')}:</span>
        <span className={styles.value}>{createdAt}</span>
      </div>
      <button
        className={styles.blockButton}
        onClick={onBlock}
        disabled={disabled}
      >
        {t('accountsManagement.block')}
      </button>
    </div>
  );
};

export default AccountCard;