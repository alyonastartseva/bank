import { CategoryChart } from "./CategoryChart";
import { TransactionHistoryList } from "@/widgets/transaction-history-list/TransactionHistoryList";
import styles from "./CategoryChartModal.module.css";
import rectangle from "@/shared/icons/rectangle.svg";
import { createPortal } from "react-dom";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryModal({ isOpen, onClose }: CategoryModalProps) {
  if (!isOpen) return null;

  return createPortal(
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
    </div>,
    document.getElementById("modal-root")!
  );
}
