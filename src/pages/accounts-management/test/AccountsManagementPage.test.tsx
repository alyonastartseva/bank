import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import AccountsManagementPage from "../AccountsManagementPage";

import {
  useGetAccountByIdQuery,
  useCreateAccountMutation,
  useBlockAccountMutation,
} from "@/entities/account/api/account-api";

vi.mock("@/entities/account/api/account-api", () => ({
  useGetAccountByIdQuery: vi.fn(),
  useCreateAccountMutation: vi.fn(),
  useBlockAccountMutation: vi.fn(),
}));

// Типы для моков
type MockReturnType = {
  data: unknown;
  isLoading: boolean;
  isError: boolean;
  error?: { status: number; data?: { message: string } };
};

type MutationMockReturnType = [() => void, { isLoading: boolean }];

describe("AccountsManagementPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useGetAccountByIdQuery as unknown as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as MockReturnType);

    (useCreateAccountMutation as unknown as vi.Mock).mockReturnValue([
      vi.fn(),
      { isLoading: false },
    ] as MutationMockReturnType);

    (useBlockAccountMutation as unknown as vi.Mock).mockReturnValue([
      vi.fn(),
      { isLoading: false },
    ] as MutationMockReturnType);
  });

  it("должен отрендерить заголовок страницы", () => {
    renderWithProviders(<AccountsManagementPage />);
    expect(screen.getByText("accountsManagement.title")).toBeInTheDocument();
  });

  it("должен открывать модалку при клике на 'Создать счет'", async () => {
    renderWithProviders(<AccountsManagementPage />);
    const createButton = screen.getByText("accountsManagement.createAccount");
    await userEvent.click(createButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("должен обновлять значение в поле поиска при вводе", async () => {
    renderWithProviders(<AccountsManagementPage />);
    const searchInput = screen.getByPlaceholderText(
      "accountsManagement.searchPlaceholder"
    );
    await userEvent.type(searchInput, "123");
    expect(searchInput).toHaveValue("123");
  });

  it("должен показывать лоадер во время загрузки", () => {
    (useGetAccountByIdQuery as unknown as vi.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    } as MockReturnType);

    renderWithProviders(<AccountsManagementPage />);
    expect(screen.getByText("common.loading")).toBeInTheDocument();
  });

  it("должен показывать ошибку, если запрос не удался", () => {
    (useGetAccountByIdQuery as unknown as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { status: 404, data: { message: "Счет не найден" } },
    } as MockReturnType);

    renderWithProviders(<AccountsManagementPage />);
    expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
  });

  it("должен отображать карточку счета, когда данные загружены", () => {
    (useGetAccountByIdQuery as unknown as vi.Mock).mockReturnValue({
      data: {
        id: "1",
        accountNumber: "1234567890",
        userId: "user1",
        balance: 1000,
        currency: "USD",
        status: "active",
        createdAt: "2024-01-01",
      },
      isLoading: false,
      isError: false,
    } as MockReturnType);

    renderWithProviders(<AccountsManagementPage />);
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("user1")).toBeInTheDocument();
  });
});