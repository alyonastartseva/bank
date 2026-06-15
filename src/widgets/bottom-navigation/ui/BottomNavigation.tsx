import { NavLink } from "react-router-dom";
import styles from "./BottomNavigation.module.css";
import NfcIcon from "@mui/icons-material/Nfc";

import homeIcon from "@/shared/icons/home.svg";
import myCardsIcon from "@/shared/icons/myCards.svg";
import statisticsIcon from "@/shared/icons/statistics.svg";
import settingsIcon from "@/shared/icons/settings.svg";
import logoutIcon from "@/shared/icons/out.svg";

import homeActiveIcon from "@/shared/icons/homeIsActive.svg";
import myCardsActiveIcon from "@/shared/icons/myCardsIsActive.svg";
import statisticsActiveIcon from "@/shared/icons/statisticsIsActive.svg";
import settingsActiveIcon from "@/shared/icons/settingsIsActive.svg";
import { AppRoutes } from "@/shared/config/routes";

const navItems = [
  { path: AppRoutes.HOME, label: "Home", icon: homeIcon, activeIcon: homeActiveIcon },
  {
    path: AppRoutes.MY_CARDS,
    label: "My Cards",
    icon: myCardsIcon,
    activeIcon: myCardsActiveIcon,
  },
  {
    path: AppRoutes.STATISTICS,
    label: "Statistics",
    icon: statisticsIcon,
    activeIcon: statisticsActiveIcon,
  },
  {
    path: AppRoutes.SETTINGS,
    label: "Settings",
    icon: settingsIcon,
    activeIcon: settingsActiveIcon,
  },
  {
    path: AppRoutes.ONBOARDING,
    label: "Log out",
    icon: logoutIcon,
    activeIcon: logoutIcon,
  },
];

export function BottomNavigation() {
  return (
    <nav className={styles.bottomNav}>
      <NfcIcon
        sx={{
          fontSize: 50,
          '@media (max-width: 720px)': {
            display: 'none',
          },
        }}
        className={styles.logo}/>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li className={styles.navListItem} key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? item.activeIcon : item.icon}
                    alt={item.label}
                    className={styles.icon}
                  />
                  <span className={styles.label}>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
