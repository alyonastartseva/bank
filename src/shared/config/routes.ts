export enum AppRoutes {
  // Публичные (без layout)
  ONBOARDING = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",

  // Приватные  (Header + BottomNavigation)
  HOME = "/home",
  STATISTICS = "/statistics",
  MY_CARDS = "/my-cards",
  SETTINGS = "/settings",
  TRANSACTION_HISTORY = "/transaction-history",

  // Приватные (только Header)
  PROFILE = "/profile",
  EDIT_PROFILE = "/edit-profile",
  ADD_NEW_CARD = "/add-new-card",
  ALL_CARDS = "/all-cards",
  SEARCH = "/search",
  SEND_MONEY = "/send-money",
  REQUEST_MONEY = "/request-money",
  LANGUAGE = "/language",
  CHANGE_PASSWORD = "/change-password",
  TERMS = "/terms",

  
  ACCOUNTS_MANAGEMENT = "/accounts-management",
}
