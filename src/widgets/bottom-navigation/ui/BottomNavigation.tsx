import { NavLink } from 'react-router-dom';
import styles from './BottomNavigation.module.css';

import homeIcon from '@/shared/icons/home.svg';
import myCardsIcon from '@/shared/icons/myCards.svg';
import statisticsIcon from '@/shared/icons/statistics.svg';
import settingsIcon from '@/shared/icons/settings.svg';

import homeActiveIcon from '@/shared/icons/homeIsActive.svg';
import myCardsActiveIcon from '@/shared/icons/myCardsIsActive.svg';
import statisticsActiveIcon from '@/shared/icons/statisticsIsActive.svg';
import settingsActiveIcon from '@/shared/icons/settingsIsActive.svg';

const navItems = [
  { path: '/home', label: 'Home', icon: homeIcon, activeIcon: homeActiveIcon },
  { path: '/my-cards', label: 'My Cards', icon: myCardsIcon, activeIcon: myCardsActiveIcon },
  { path: '/statistics', label: 'Statistics', icon: statisticsIcon, activeIcon: statisticsActiveIcon },
  { path: '/settings', label: 'Settings', icon: settingsIcon, activeIcon: settingsActiveIcon },
];

export function BottomNavigation() {
  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
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
      ))}
    </nav>
  );
}