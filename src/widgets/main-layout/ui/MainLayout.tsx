import { Outlet } from "react-router-dom";
import { Header } from "../../header/ui/Header";
import { Navigation } from "@/widgets/navigation/ui/Navigation";
import styles from "./MainLayout.module.css";
import { useMediaQuery } from "@mui/material";

interface MainLayoutProps {
  hideNavOnMobile?: boolean;
}

export const MainLayout = ({ hideNavOnMobile = false }: MainLayoutProps) => {
  const isDesktop = useMediaQuery("(min-width: 720px)");
  const showNavigation = isDesktop || !hideNavOnMobile;

  return (
    <div className={styles.layout}>
      {showNavigation && (
        <nav className={styles.navigation}>
          <Navigation />
        </nav>
      )}
      <div className={styles.right}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
