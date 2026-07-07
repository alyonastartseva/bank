import {
  createBrowserRouter,
  RouterProvider as RouterProviderRRD,
} from "react-router-dom";

import { AppRoutes } from "@/shared/config/routes.ts";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "@/widgets/main-layout/ui/MainLayout";
import { PageLayout } from "@/widgets/page-layout/ui/PageLayout";

// Импорты всех страниц
import { RootRedirect } from "./RootRedirect";
import SignInPage from "@/pages/sign-in/SignInPage";
import SignUpPage from "@/pages/sign-up/SignUpPage";
import HomePage from "@/pages/home/HomePage";
import StatisticsPage from "@/pages/statistics/StatisticsPage";
import MyCardsPage from "@/pages/my-cards/MyCardsPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import TransactionHistoryPage from "@/pages/transaction-history/TransactionHistoryPage";
import ProfilePage from "@/pages/profile/ui/ProfilePage";
import EditProfilePage from "@/pages/edit-profile/ui/EditProfilePage";
import AddNewCardPage from "@/pages/add-new-card/AddNewCardPage";
import SearchPage from "@/pages/search/SearchPage";
import SendMoneyPage from "@/pages/send-money/SendMoneyPage";
import RequestMoneyPage from "@/pages/request-money/RequestMoneyPage";
import LanguagePage from "@/pages/language/LanguagePage";
import ChangePasswordPage from "@/pages/change-password/ChangePasswordPage";
import TermsPage from "@/pages/terms/ui/TermsPage.tsx";

import AccountsManagementPage from "@/pages/accounts-management/AccountsManagementPage";

const router = createBrowserRouter([
  // ========== ПУБЛИЧНЫЕ РОУТЫ (без layout) ==========
  {
    path: AppRoutes.ONBOARDING,
    element: <RootRedirect />,
  },
  {
    path: AppRoutes.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: AppRoutes.SIGN_UP,
    element: <SignUpPage />,
  },

  // ========== ПРИВАТНЫЕ РОУТЫ ==========

  //  Header + Navigation
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: AppRoutes.HOME, element: <HomePage /> },
      { path: AppRoutes.STATISTICS, element: <StatisticsPage /> },
      { path: AppRoutes.MY_CARDS, element: <MyCardsPage /> },
      { path: AppRoutes.SETTINGS, element: <SettingsPage /> },
      {
        path: AppRoutes.TRANSACTION_HISTORY,
        element: <TransactionHistoryPage />,
      },
      { path: AppRoutes.CHANGE_PASSWORD, element: <ChangePasswordPage /> },
    ],
  },

  //  Header + Navigation (с hideNavOnMobile) — только для профиля
  {
    element: (
      <ProtectedRoute>
        <MainLayout hideNavOnMobile />
      </ProtectedRoute>
    ),
    children: [
      { path: AppRoutes.PROFILE, element: <ProfilePage /> },
      { path: AppRoutes.REQUEST_MONEY, element: <RequestMoneyPage /> },
    ],
  },

  //  только Header
  {
    element: (
      <ProtectedRoute>
        <PageLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: AppRoutes.EDIT_PROFILE, element: <EditProfilePage /> },
      { path: AppRoutes.ADD_NEW_CARD, element: <AddNewCardPage /> },
      { path: AppRoutes.SEARCH, element: <SearchPage /> },
      { path: AppRoutes.SEND_MONEY, element: <SendMoneyPage /> },
      { path: AppRoutes.LANGUAGE, element: <LanguagePage /> },
      { path: AppRoutes.TERMS, element: <TermsPage /> },

      { path: AppRoutes.ACCOUNTS_MANAGEMENT, element: <AccountsManagementPage /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProviderRRD router={router} />;
};
