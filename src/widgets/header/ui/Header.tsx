import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';
import goBackIcon from "@/shared/icons/go-back.svg";
import logoutIcon from "@/shared/icons/out.svg";
import searchIcon from "@/shared/icons/Search, Loupe.svg"
import bellIcon from "@/shared/icons/Bell, Notification.svg"
import addIcon from "@/shared/icons/Add.svg"
import editUserIcon from "@/shared/icons/editUser.svg"
import historyIcon from "@/shared/icons/history.svg"
import closeIcon from "@/shared/icons/close.svg"

const headerConfig: Record<string, { titleKey: string; rightIcon?: string; rightAction?: () => void }> = {
   '/home': {
    titleKey: 'home.title',
    rightIcon: searchIcon,
  },
  '/statistics': {
    titleKey: 'statistics.title',
    rightIcon: bellIcon,
  },
  '/my-cards': {
    titleKey: 'myCards.title',
    rightIcon: addIcon,
  },
  '/settings': {
    titleKey: 'settings.title',
    rightIcon: logoutIcon,
  },
  '/transaction-history': {
    titleKey: 'transaction-history.title',
    rightIcon: historyIcon,
  },
  '/profile': {
    titleKey: 'profile.title',
    rightIcon: editUserIcon,
  },
  '/edit-profile': {
    titleKey: 'edit-profile.title',
  },
  '/add-new-card': {
    titleKey: 'add-new-card.title',
  },
  '/all-cards': {
    titleKey: 'all-cards.title',
  },
  '/search': {
    titleKey: 'search.title',
    rightIcon: closeIcon,
  },
   '/send-money': {
    titleKey: 'send-money.title',
  },
};

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const config = headerConfig[location.pathname] || {
    titleKey: 'common.title',
    rightIcon: null,
  };

  const handleRightClick = () => {
    if (config.rightAction) config.rightAction();
  };

  return (
     <header className={styles.header}>
    <div className={styles.left}>
      <button className={styles.iconButton} onClick={() => navigate(-1)}>
        <img src={goBackIcon} className={styles.icon} alt="back" />
      </button>
    </div>
    <h1 className={styles.title}>{t(config.titleKey)}</h1>
    <div className={styles.right}>
      {config.rightIcon && (
        <button className={styles.iconButton} onClick={handleRightClick}>
          <img src={config.rightIcon} className={styles.icon} alt="action" />
        </button>
      )}
    </div>
  </header>
  );
}