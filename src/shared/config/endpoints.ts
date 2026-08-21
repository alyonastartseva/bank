enum API_BASE_URLS {
  ACCOUNT = "/account-service/api",
  TRANSACTIONS = "/transaction-service/api/v1",
  SETTINGS = "/user-settings-service/api",
  KYC = "/kyc-service/api",
}

export const API_ENDPOINTS = {
  ACCOUNT: {
    GET_BY_ID: (id: string) => API_BASE_URLS.ACCOUNT + `/accounts/${id}`,
    GET_BALANCE: (id: string) => API_BASE_URLS.ACCOUNT + `/accounts/${id}/balance`,
    CREATE: API_BASE_URLS.ACCOUNT + "/accounts",
    BLOCK: (id: string) => API_BASE_URLS.ACCOUNT + `/accounts/${id}/block`,
    GET_MY_ACCOUNTS: API_BASE_URLS.ACCOUNT + "/accounts/me",
  },
  TRANSACTIONS: {
    GET: API_BASE_URLS.TRANSACTIONS + "/transactions",
    GET_BY_ID: (id: string) => API_BASE_URLS.TRANSACTIONS + `/transactions/${id}`,
    POST: API_BASE_URLS.TRANSACTIONS + "/transactions",
    UPDATE_BY_ID: (id: string) => API_BASE_URLS.TRANSACTIONS + `/transactions/${id}`,
  },
  SETTINGS: {
    GET_BY_ID: (userId: number) => API_BASE_URLS.SETTINGS + `/settings/${userId}`,
    POST: API_BASE_URLS.SETTINGS + "/settings",
    PATCH_BY_ID: (userId: number) => API_BASE_URLS.SETTINGS + `/settings/${userId}`,
    DELETE_BY_ID: (userId: number) => API_BASE_URLS.SETTINGS + `/settings/${userId}`,
  },
  KYC: {
    START: (userId: number) => API_BASE_URLS.KYC + `/kyc/start?userId=${userId}`,
    GET_STATUS: (userId: number) => API_BASE_URLS.KYC + `/kyc/${userId}`,
    UPLOAD_DOCUMENT: (userId: number, type: string | number) =>
      API_BASE_URLS.KYC + `/kyc/${userId}/documents?type=${type}`,
  },
  USER: {
    GET_BY_ID: (userId: number) => API_BASE_URLS.ACCOUNT + `/users/${userId}`,
    CHANGE_PASSWORD: API_BASE_URLS.ACCOUNT + "/users/password-change",
  },
} as const;
