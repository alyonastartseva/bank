import { vi } from "vitest";
import { HTTP_STATUS } from "../test-constants";
/* eslint-disable @typescript-eslint/no-explicit-any */

export const mockKycStatus = (
  mockedUseGetKycStatusQuery: unknown,
  status: string | null,
  error?: { status: number }
): void => {
  (mockedUseGetKycStatusQuery as any).mockReturnValue({
    data: status ? { status } : undefined,
    error: error || undefined,
    refetch: vi.fn(),
  });
};

export const mockStartKyc = (mockedUseStartKycMutation: unknown, isLoading = false) => {
  const startKyc = vi.fn().mockReturnValue({
    unwrap: vi.fn().mockResolvedValue({}),
  });
  (mockedUseStartKycMutation as any).mockReturnValue([
    startKyc,
    { isLoading, reset: vi.fn() },
  ]);
  return startKyc;
};

export const mockUploadDocument = (
  mockedUseUploadDocumentMutation: unknown,
  isLoading = false
) => {
  const uploadDocument = vi.fn().mockReturnValue({
    unwrap: vi.fn().mockResolvedValue({}),
  });
  (mockedUseUploadDocumentMutation as any).mockReturnValue([
    uploadDocument,
    { isLoading, reset: vi.fn() },
  ]);
  return uploadDocument;
};

export const setupDefaultKycMocks = (
  mockedUseGetKycStatusQuery: unknown,
  mockedUseStartKycMutation: unknown,
  mockedUseUploadDocumentMutation: unknown
): void => {
  (mockedUseGetKycStatusQuery as any).mockReturnValue({
    data: undefined,
    error: { status: HTTP_STATUS.NOT_FOUND },
    refetch: vi.fn(),
  });

  const defaultMutationResult = { unwrap: vi.fn().mockResolvedValue({}) };
  (mockedUseStartKycMutation as any).mockReturnValue([
    vi.fn().mockReturnValue(defaultMutationResult),
    { isLoading: false, reset: vi.fn() },
  ]);

  (mockedUseUploadDocumentMutation as any).mockReturnValue([
    vi.fn().mockReturnValue(defaultMutationResult),
    { isLoading: false, reset: vi.fn() },
  ]);
};
