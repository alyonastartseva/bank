import { useNavigate } from "react-router-dom";
import { IconButton, CircularProgress } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AppRoutes } from "../../../shared/config/routes";
import { useGetUserQuery } from "../../../entities/user/api/user-api";
import styles from "./ProfilePage.module.css";
import { useTranslation } from "react-i18next";

const MOCK_USER_ID = 1;

const mockUser = {
  fullName: " Your name is not defined",
  role: "Your role is not defined",
  avatar: "https://i.pravatar.cc/70?u=1",
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Массив пунктов меню с переведёнными лейблами (теперь внутри компонента)
  const menuItems = [
    {
      id: 1,
      label: t("profile.menu.personalInfo"),
      icon: AccountCircleOutlinedIcon,
      path: AppRoutes.EDIT_PROFILE,
    },
    {
      id: 2,
      label: t("profile.menu.paymentPrefs"),
      icon: PaymentIcon,
      path: "#",
    },
    {
      id: 3,
      label: t("profile.menu.banksCards"),
      icon: CreditCardIcon,
      path: "#",
    },
    {
      id: 4,
      label: t("profile.menu.notifications"),
      icon: NotificationsNoneOutlinedIcon,
      path: "#",
    },
    {
      id: 5,
      label: t("profile.menu.messageCenter"),
      icon: TextsmsOutlinedIcon,
      path: "#",
    },
    {
      id: 6,
      label: t("profile.menu.address"),
      icon: LocationOnOutlinedIcon,
      path: "#",
    },
    {
      id: 7,
      label: t("profile.menu.settings"),
      icon: SettingsOutlinedIcon,
      path: "#",
    },
  ];

  const { data: user, isLoading } = useGetUserQuery(MOCK_USER_ID);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <CircularProgress />
      </div>
    );
  }

  const displayName = user?.fullName || mockUser.fullName;
  const displayRole = user?.role || mockUser.role;
  const displayAvatar = mockUser.avatar;

  return (
    <div className={styles.profile}>
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

        <h1 className={styles.title}>{t("profile.title")}</h1>

        <IconButton
          className={styles.editButton}
          onClick={() => navigate(AppRoutes.EDIT_PROFILE)}
          sx={{ width: 42, height: 42 }}
        >
          <AccountCircleOutlinedIcon className={styles.icon} sx={{ fill: "#1e1e2d" }} />
        </IconButton>
      </div>

      <div className={styles.user}>
        <div className={styles.avatar}>
          <img src={displayAvatar} alt={displayName} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{displayName}</h2>
          <p className={styles.role}>{displayRole}</p>
        </div>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className={styles.menuItem}
              onClick={() => navigate(item.path)}
            >
              <IconComponent className={styles.menuIcon} />
              <span className={styles.menuLabel}>{item.label}</span>
              <span className={styles.menuArrow}>›</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfilePage;
