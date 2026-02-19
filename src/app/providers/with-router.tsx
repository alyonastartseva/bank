import {
  createBrowserRouter,
  RouterProvider as RouterProviderRRD,
} from "react-router-dom";

import { AppRoutes } from "@/shared/config/routes.ts";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { MainLayout } from "../../widgets/main-layout/ui/MainLayout";
// import { PageLayout } from "../../widgets/page-layout/ui/PageLayout";

// Импорты всех страниц
// import { OnboardingPage } from "../../pages/onboarding";
// import { SignInPage } from "../../pages/sign-in";
import  SignUpPage  from "@/pages/sign-up/SignUpPage.tsx";
// import { HomePage } from "../../pages/home";
// import { StatisticsPage } from "../../pages/statistics";
// import { MyCardsPage } from "../../pages/my-cards";
// import { SettingsPage } from "../../pages/settings";
// import { TransactionHistoryPage } from "../../pages/transaction-history";
// import { ProfilePage } from "../../pages/profile";
// import { EditProfilePage } from "../../pages/edit-profile";
// import { AddNewCardPage } from "../../pages/add-new-card";
// import { AllCardsPage } from "../../pages/all-cards";
// import { SearchPage } from "../../pages/search";
// import { SendMoneyPage } from "../../pages/send-money";
// import { RequestMoneyPage } from "../../pages/request-money";
// import { LanguagePage } from "../../pages/language";
// import { ChangePasswordPage } from "../../pages/change-password";
// import { TermsPage } from "../../pages/terms";

// const isAuthenticated = false; // брать из стора

const router = createBrowserRouter([
  // ========== ПУБЛИЧНЫЕ РОУТЫ (без layout) ==========
  // {
  //   path: AppRoutes.ONBOARDING,
  //   element: <OnboardingPage />,
  // },
  // {
  //   path: AppRoutes.SIGN_IN,
  //   element: <SignInPage />,
  // },
  {
    path: AppRoutes.SIGN_UP,
    element: <SignUpPage />,
  },

  // ========== ПРИВАТНЫЕ РОУТЫ ==========

  //  Header + BottomNavigation
  // {
  //   element: (
  //     <ProtectedRoute isAllowed={isAuthenticated}>
  //       <MainLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { path: AppRoutes.HOME, element: <HomePage /> },
  //     { path: AppRoutes.STATISTICS, element: <StatisticsPage /> },
  //     { path: AppRoutes.MY_CARDS, element: <MyCardsPage /> },
  //     { path: AppRoutes.SETTINGS, element: <SettingsPage /> },
  //     {
  //       path: AppRoutes.TRANSACTION_HISTORY,
  //       element: <TransactionHistoryPage />,
  //     },
  //   ],
  // },
  //
  // //  только Header
  // {
  //   element: (
  //     <ProtectedRoute isAllowed={isAuthenticated}>
  //       <PageLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { path: AppRoutes.PROFILE, element: <ProfilePage /> },
  //     { path: AppRoutes.EDIT_PROFILE, element: <EditProfilePage /> },
  //     { path: AppRoutes.ADD_NEW_CARD, element: <AddNewCardPage /> },
  //     { path: AppRoutes.ALL_CARDS, element: <AllCardsPage /> },
  //     { path: AppRoutes.SEARCH, element: <SearchPage /> },
  //     { path: AppRoutes.SEND_MONEY, element: <SendMoneyPage /> },
  //     { path: AppRoutes.REQUEST_MONEY, element: <RequestMoneyPage /> },
  //     { path: AppRoutes.LANGUAGE, element: <LanguagePage /> },
  //     { path: AppRoutes.CHANGE_PASSWORD, element: <ChangePasswordPage /> },
  //     { path: AppRoutes.TERMS, element: <TermsPage /> },
  //   ],
  // },
]);

export const AppRouter = () => {
  return <RouterProviderRRD router={router} />;
};
