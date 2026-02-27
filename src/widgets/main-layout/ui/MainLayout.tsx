import { Outlet } from "react-router-dom";
// import { Header } from "../../header/ui/Header";
// import { BottomNavigation } from "../../bottom-navigation/ui/BottomNavigation";

export const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* <Header /> */}
      <main className="main-layout__content">
        <Outlet />
      </main>
      {/* <BottomNavigation /> */}
    </div>
  );
};
