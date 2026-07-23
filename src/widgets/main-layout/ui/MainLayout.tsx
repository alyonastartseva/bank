import { Outlet } from "react-router-dom";
import { Navigation } from "@/widgets/navigation/ui/Navigation.tsx";
import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};
