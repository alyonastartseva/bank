export const API_ENDPOINTS = {
  ACCOUNT: {
    GET_BY_ID: (id: string) => `/account-service/api/accounts/${id}`,
    GET_BALANCE: (id: string) => `/account-service/api/accounts/${id}/balance`,
    CREATE: "/account-service/api/accounts",
    BLOCK: (id: string) => `/account-service/api/accounts/${id}/block`,
    GET_MY_ACCOUNTS: "/account-service/api/accounts/me",
  },
  TRANSACTIONS: {
    GET: "/transaction-service/api/v1/transactions",
    GET_BY_ID: (id: string) => `/transactions/${id}`,
    POST: "/transaction-service/api/v1/transactions",
    UPDATE_BY_ID: (id: string) => `/transactions/${id}`,
  },
  SETTINGS: {
    GET_BY_ID: (userId: number) => `/user-settings-service/api/settings/${userId}`,
    POST: "/user-settings-service/api/settings",
    PATCH_BY_ID: (userId: number) => `/user-settings-service/api/settings/${userId}`,
    DELETE_BY_ID: (userId: number) => `/user-settings-service/api/settings/${userId}`,
  },
  KYC: {
    START: (userId: number) => `/kyc-service/api/kyc/start?userId=${userId}`,
    GET_STATUS: (userId: number) => `/kyc-service/api/kyc/${userId}`,
    UPLOAD_DOCUMENT: (userId: number, type: string | number) =>
      `/kyc-service/api/kyc/${userId}/documents?type=${type}`,
  },
  USER: {
    GET_BY_ID: (userId: number) => `/account-service/api/users/${userId}`,
    CHANGE_PASSWORD: "/account-service/api/users/password-change",
  },
} as const;
