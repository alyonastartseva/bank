import { Outlet } from "react-router-dom";
import { Navigation } from "@/widgets/navigation/ui/Navigation.tsx";
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
      <main className={styles.content}>
        <Outlet />
      </main>
      {showNavigation && <Navigation />}
    </div>
  );
};
