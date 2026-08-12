export interface KycStatus {
  status: "pending" | "approved" | "rejected";
};


export interface StartKycResponse {
  id: string;
  status: KycStatus;
  updatedAt: string;
};