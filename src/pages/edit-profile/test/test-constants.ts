// test-constants.ts
export const HTTP_STATUS = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  BAD_REQUEST: 400,
} as const;

export const KYC_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;
