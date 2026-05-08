import { useNavigate } from 'react-router-dom';
import { useUser } from '@/shared/hooks/useUser';
import searchIcon from '@/shared/icons/search.svg';
import defaultAvatar from '@/shared/icons/avatar.svg';
import styles from './ProfileHeader.module.css';

export const ProfileHeader = () => {
  const navigate = useNavigate();
  const { fullName } = useUser();
  const avatar = defaultAvatar;

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
        <div>
          <div className={styles.welcomeText}>Welcome back,</div>
          <div className={styles.userName}>{fullName}</div>
        </div>
      </div>
      <button className={styles.searchButton} onClick={() => navigate('/search')}>
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
      </button>
    </div>
  );
};