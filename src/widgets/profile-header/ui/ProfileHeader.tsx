import searchIcon from '@/shared/icons/search.svg';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileHeader.module.css';

export const ProfileHeader = () => {
  const navigate = useNavigate();

  // Временная заглушка
  const firstName = 'Tanya';
  const lastName = 'Myroniuk';
  const avatar = 'src/shared/icons/avatar.svg';

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
        <div>
          <div className={styles.welcomeText}>Welcome back,</div>
          <div className={styles.userName}>{firstName} {lastName}</div>
        </div>
      </div>
      <button className={styles.searchButton} onClick={() => navigate('/search')}>
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
      </button>
    </div>
  );
};