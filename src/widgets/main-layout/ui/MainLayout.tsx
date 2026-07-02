import { Outlet } from "react-router-dom";
import { Header } from "../../header/ui/Header";
import { Navigation } from "@/widgets/navigation/ui/Navigation.tsx";
import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <nav className={styles.navigation}>
        <Navigation />
      </nav>
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
