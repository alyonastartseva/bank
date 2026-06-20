import { Outlet } from "react-router-dom";
import { BottomNavigation } from "../../bottom-navigation/ui/BottomNavigation";

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <main className="main-layout__content">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
