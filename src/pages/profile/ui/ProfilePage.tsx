import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AppRoutes } from "../../../shared/config/routes";
import styles from "./ProfilePage.module.scss";

const mockUser = {
  fullName: "Tanya Myroniuk",
  role: "Senior Designer",
  avatar: "https://i.pravatar.cc/70?u=1",
};

const menuItems = [
  {
    id: 1,
    label: "Personal Information",
    icon: AccountCircleOutlinedIcon,
    path: AppRoutes.EDIT_PROFILE,
  },
  { id: 2, label: "Payment Preferences", icon: PaymentIcon, path: "#" },
  { id: 3, label: "Banks and Cards", icon: CreditCardIcon, path: "#" },
  {
    id: 4,
    label: "Notifications",
    icon: NotificationsNoneOutlinedIcon,
    path: "#",
  },
  { id: 5, label: "Message Center", icon: TextsmsOutlinedIcon, path: "#" },
  { id: 6, label: "Address", icon: LocationOnOutlinedIcon, path: "#" },
  { id: 7, label: "Settings", icon: SettingsOutlinedIcon, path: "#" },
];

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <IconButton
          className={styles.backButton}
          onClick={() => navigate(-1)}
          sx={{ width: 42, height: 42, bgcolor: "#f4f4f4" }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>

        <h1 className={styles.title}>Profile</h1>

        <IconButton
          className={styles.editButton}
          onClick={() => navigate(AppRoutes.EDIT_PROFILE)}
          sx={{ width: 42, height: 42, bgcolor: "#f4f4f4" }}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
      </div>

      <div className={styles.user}>
        <div className={styles.avatar}>
          <img src={mockUser.avatar} alt={mockUser.fullName} />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{mockUser.fullName}</h2>
          <p className={styles.role}>{mockUser.role}</p>
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
