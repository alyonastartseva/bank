import styles from "@/widgets/navigation/ui/Navigation.module.css";
import { NavLink } from "react-router-dom";

interface NavigationItem {
  path: string
  label: string
  icon: string
  activeIcon: string
}

interface NavigationLinkProps {
  item: NavigationItem
}

export const NavigationLink = ({ item }: NavigationLinkProps) => {
  return (
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
  );
};