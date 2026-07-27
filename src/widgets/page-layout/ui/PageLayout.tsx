import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header/ui/Header";

export const PageLayout = () => {
  return (
    <div className="page-layout">
      <Header />
      <main className="page-layout__content">
        <Outlet />
      </main>
    </div>
  );
};
