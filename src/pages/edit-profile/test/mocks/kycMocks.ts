import { vi, type Mock } from "vitest";
import { HTTP_STATUS } from "../test-constants";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const mockKycStatus = (
  mockedUseGetKycStatusQuery: Mock,
  status: string | null,
  error?: { status: number }
): void => {
  mockedUseGetKycStatusQuery.mockReturnValue({
    data: status ? { status } : undefined,
    error: error || undefined,
    refetch: vi.fn(),
  });
};

export const mockStartKyc = (mockedUseStartKycMutation: Mock, isLoading = false) => {
  const startKyc = vi.fn().mockReturnValue({
    unwrap: vi.fn().mockResolvedValue({}),
  });
  mockedUseStartKycMutation.mockReturnValue([
    startKyc,
    { isLoading, reset: vi.fn() },
  ]);
  return startKyc;
};

export const mockUploadDocument = (
  mockedUseUploadDocumentMutation: Mock,
  isLoading = false
) => {
  const uploadDocument = vi.fn().mockReturnValue({
    unwrap: vi.fn().mockResolvedValue({}),
  });
  mockedUseUploadDocumentMutation.mockReturnValue([
    uploadDocument,
    { isLoading, reset: vi.fn() },
  ]);
  return uploadDocument;
};

export const setupDefaultKycMocks = (
  mockedUseGetKycStatusQuery: Mock,
  mockedUseStartKycMutation: Mock,
  mockedUseUploadDocumentMutation: Mock
): void => {
  mockedUseGetKycStatusQuery.mockReturnValue({
    data: undefined,
    error: { status: HTTP_STATUS.NOT_FOUND },
    refetch: vi.fn(),
  });

  const defaultMutationResult = { unwrap: vi.fn().mockResolvedValue({}) };
  mockedUseStartKycMutation.mockReturnValue([
    vi.fn().mockReturnValue(defaultMutationResult),
    { isLoading: false, reset: vi.fn() },
  ]);

  mockedUseUploadDocumentMutation.mockReturnValue([
    vi.fn().mockReturnValue(defaultMutationResult),
    { isLoading: false, reset: vi.fn() },
  ]);
};
