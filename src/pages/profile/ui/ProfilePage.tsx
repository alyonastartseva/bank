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
import "./ProfilePage.scss";

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
    <div className="profile">
      <div className="profile__header">
        <IconButton
          className="profile__back"
          onClick={() => navigate(-1)}
          sx={{ width: 42, height: 42, bgcolor: "#f4f4f4" }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>

        <h1 className="profile__title">Profile</h1>

        <IconButton
          className="profile__edit"
          onClick={() => navigate(AppRoutes.EDIT_PROFILE)}
          sx={{ width: 42, height: 42, bgcolor: "#f4f4f4" }}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
      </div>

      <div className="profile__user">
        <div className="profile__avatar">
          <img src={mockUser.avatar} alt={mockUser.fullName} />
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{mockUser.fullName}</h2>
          <p className="profile__role">{mockUser.role}</p>
        </div>
      </div>

      <nav className="profile__menu">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              className="profile__menu-item"
              onClick={() => navigate(item.path)}
            >
              <IconComponent className="profile__menu-icon" />
              <span className="profile__menu-label">{item.label}</span>
              <span className="profile__menu-arrow">›</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfilePage;
