import styles from "./Navigation.module.css";
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
import { NavigationLink } from "@/widgets/navigation/ui/NavigationLink.tsx";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const useNavItems = () => {
  const { t } = useTranslation();

  return [
    {
      path: AppRoutes.HOME,
      label: t("home.title"),
      icon: homeIcon,
      activeIcon: homeActiveIcon,
    },
    {
      path: AppRoutes.MY_CARDS,
      label: t("myCards.title"),
      icon: myCardsIcon,
      activeIcon: myCardsActiveIcon,
    },
    {
      path: AppRoutes.STATISTICS,
      label: t("statistics.title"),
      icon: statisticsIcon,
      activeIcon: statisticsActiveIcon,
    },
    {
      path: AppRoutes.SETTINGS,
      label: t("settings.title"),
      icon: settingsIcon,
      activeIcon: settingsActiveIcon,
    },
  ];
};

const useLogoutItem = () => {
  const { t } = useTranslation();

  const logoutItem = {
    path: AppRoutes.ONBOARDING,
    label: t("logout.title"),
    icon: logoutIcon,
    activeIcon: logoutIcon,
  };

  return logoutItem;
};

export function Navigation() {
  const isDesktop = useMediaQuery("(min-width: 720px)");
  const navItems = useNavItems();
  const logoutItem = useLogoutItem();
  return (
    <nav className={styles.bottomNav}>
      <NfcIcon
        sx={{
          fontSize: 50,
          "@media (max-width: 720px)": {
            display: "none",
          },
        }}
        className={styles.logo}
      />
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li className={styles.navListItem} key={item.path}>
            <NavigationLink item={item} />
          </li>
        ))}
      </ul>
      {isDesktop && <NavigationLink item={logoutItem} />}
    </nav>
  );
}
