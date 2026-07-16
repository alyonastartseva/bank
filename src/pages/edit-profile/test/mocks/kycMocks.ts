import { vi } from "vitest";
import { HTTP_STATUS } from "../test-constants";

type MockReturn = {
  mockReturnValue: (value: unknown) => unknown;
};

export const mockKycStatus = (
  mockedUseGetKycStatusQuery: unknown,
  status: string | null,
  error?: { status: number }
): void => {
  (mockedUseGetKycStatusQuery as MockReturn).mockReturnValue({
    data: status ? { status } : undefined,
    error: error || undefined,
    refetch: vi.fn(),
  });
};

export const mockStartKyc = (mockedUseStartKycMutation: unknown, isLoading = false) => {
  const startKyc = vi.fn().mockReturnValue({
    unwrap: vi.fn().mockResolvedValue({}),
  });
  (mockedUseStartKycMutation as MockReturn).mockReturnValue([
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
  (mockedUseUploadDocumentMutation as MockReturn).mockReturnValue([
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
  (mockedUseGetKycStatusQuery as MockReturn).mockReturnValue({
    data: undefined,
    error: { status: HTTP_STATUS.NOT_FOUND },
    refetch: vi.fn(),
  });

  const defaultMutationResult = { unwrap: vi.fn().mockResolvedValue({}) };
  (mockedUseStartKycMutation as MockReturn).mockReturnValue([
    vi.fn().mockReturnValue(defaultMutationResult),
    { isLoading: false, reset: vi.fn() },
  ]);

  (mockedUseUploadDocumentMutation as MockReturn).mockReturnValue([
    vi.fn().mockReturnValue(defaultMutationResult),
    { isLoading: false, reset: vi.fn() },
  ]);
};
