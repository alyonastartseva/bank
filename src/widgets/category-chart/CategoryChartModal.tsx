import { useEffect } from 'react';
import { CategoryChart } from './CategoryChart';
import { TransactionHistoryList } from '@/widgets/transaction-history-list/TransactionHistoryList';
import styles from './CategoryChartModal.module.css';
import rectangle from "@/shared/icons/rectangle.svg";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.rectangle}>
          <img src={rectangle} alt="rectangle" />
        </div>
        <div className={styles.modalContent}>
          <CategoryChart />
          <div className={styles.transactionsSection}>
            <TransactionHistoryList />
          </div>
        </div>
      </div>
    </div>
  );
}