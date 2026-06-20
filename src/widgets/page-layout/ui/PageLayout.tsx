import { Outlet } from "react-router-dom";

export const PageLayout = () => {
  return (
    <div className="page-layout">
      <main className="page-layout__content">
        <Outlet />
      </main>
    </div>
  );
};
