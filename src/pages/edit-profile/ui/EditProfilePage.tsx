import { useNavigate } from "react-router-dom";
import { IconButton, CircularProgress } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { useGetUserQuery } from "../../../entities/user/api/user-api";
import styles from "./EditProfilePage.module.css";
import { useTranslation } from 'react-i18next';

const MOCK_USER_ID = 1;

const mockUser = {
  avatar: "https://i.pravatar.cc/70?u=1",
  phone: "+8801712663389",
  birthDate: "28 September 2000",
  joinedDate: "28 Jan 2021",
};

const EditProfilePage = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  // Загружаем данные с бэка
  const { data: user, isLoading } = useGetUserQuery(MOCK_USER_ID);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.editProfile}>
      <div className={styles.header}>
        <IconButton
          className={styles.backButton}
          onClick={() => navigate(-1)}
          sx={{ width: 42, height: 42, backgroundColor: "var(--color-item-bg)" }}
        >
          <ArrowBackIosNewOutlinedIcon
            className={styles.icon}
            sx={{ fill: "#1e1e2d", width: 18 }}
          />
        </IconButton>
        <h1 className={styles.title}>{t('editProfile.title')}</h1>
        <div className={styles.placeholder} />
      </div>

      <div className={styles.avatar}>
        <img src={mockUser.avatar} alt={user?.fullName || "User"} />
      </div>

      <div className={styles.info}>
        <h2>{user?.fullName}</h2>
        <p>{user?.role || "Senior Designer"}</p>
      </div>

      <div className={styles.form}>
        {/* Full Name - только чтение */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t('editProfile.fullName')}</span>
          <div className={styles.field}>
            <AccountCircleOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{user?.fullName}</span>
          </div>
        </div>

        {/* Email - только чтение */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t('editProfile.email')}</span>
          <div className={styles.field}>
            <EmailOutlinedIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{user?.email}</span>
          </div>
        </div>

        {/* Phone - мок */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t('editProfile.phone')}</span>
          <div className={styles.field}>
            <PhoneIcon className={styles.fieldIcon} />
            <span className={styles.fieldValue}>{mockUser.phone}</span>
          </div>
        </div>

        {/* Birth Date - мок */}
        <div className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>{t('editProfile.birthDate')}</span>
          <div className={`${styles.field} ${styles.fieldDate}`}>
            <span className={styles.datePart}>28</span>
            <span className={styles.dateSpacer}> </span>
            <span className={styles.datePart}>September</span>
            <span className={styles.dateSpacer}> </span>
            <span className={styles.datePart}>2000</span>
          </div>
        </div>
      </div>

      <p className={styles.joined}>{t('editProfile.joined', { date: mockUser.joinedDate })}</p>
    </div>
  );
};

export default EditProfilePage;
