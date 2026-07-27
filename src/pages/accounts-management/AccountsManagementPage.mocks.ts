import { vi } from "vitest";

export interface Account {
  id: string;
  balance: number;
  accountNumber: string;
  currency: string;
  status: string;
}

export interface AccountCardProps {
  id: string;
  balance: number;
  accountNumber: string;
  currency: string;
  status: string;
  onBlock: () => void;
  disabled: boolean;
}

export const mockState = {
  accountData: null as Account | null,
  isLoading: false,
  isError: false,
  errorData: null as { message: string } | null,
};

export const mockUnwrap = vi.fn(() => Promise.resolve());
export const mockBlockAccountMutation = vi.fn(() => ({
  unwrap: mockUnwrap,
}));

export const resetMockState = () => {
  mockState.accountData = null;
  mockState.isLoading = false;
  mockState.isError = false;
  mockState.errorData = null;
};
