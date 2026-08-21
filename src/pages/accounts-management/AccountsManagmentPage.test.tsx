import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AccountsManagementPage from "./AccountsManagementPage";
import {
  mockState,
  mockUnwrap,
  mockBlockAccountMutation,
  resetMockState,
} from "./AccountsManagementPage.mocks";

vi.mock("@/entities/account/api/account-api", () => ({
  useGetAccountByIdQuery: vi.fn(() => ({
    data: mockState.accountData,
    isLoading: mockState.isLoading,
    isError: mockState.isError,
    error: mockState.errorData,
  })),
  useCreateAccountMutation: () => [vi.fn()],
  useBlockAccountMutation: () => [mockBlockAccountMutation],
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "accountsManagement.title": "Account Management",
        "accountsManagement.createAccount": "Create Account",
        "accountsManagement.searchPlaceholder": "Search accounts...",
        "accountsManagement.load": "Load",
        "accountsManagement.closeModal": "Close",
        "accountsManagement.block": "Block",
        "common.loading": "Loading...",
        "accountsManagement.accountId": "Account ID",
        "accountsManagement.accountNumber": "Account Number",
        "accountsManagement.balance": "Balance",
        "accountsManagement.currency": "Currency",
        "accountsManagement.status": "Status",
        "accountsManagement.statusActive": "Active",
        "accountsManagement.statusBlocked": "Blocked",
        "accountsManagement.createdAt": "Created At",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Тестирование админской панели управления счетами", () => {
  beforeEach(() => {
    resetMockState();

    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "clear").mockImplementation(() => {});

    vi.clearAllMocks();
  });

  test("1. Базовый рендеринг: все элементы управления на месте", () => {
    render(<AccountsManagementPage />);
    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search accounts...")).toBeInTheDocument();
    expect(screen.getByText("Load")).toBeInTheDocument();
  });

  test("2. Модалка: клик по кнопке создания открывает и закрывает окно", async () => {
    const user = userEvent.setup();
    render(<AccountsManagementPage />);

    const openBtn = screen.getByText("Create Account");
    await user.click(openBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByText("Отмена");
    await user.click(closeBtn);

    await vi.waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  test("3. Поиск: текст в инпуте корректно меняется при вводе", async () => {
    const user = userEvent.setup();
    render(<AccountsManagementPage />);

    const input = screen.getByPlaceholderText("Search accounts...");
    await user.clear(input);
    await user.type(input, "ACCOUNT-999-TEST");

    expect(screen.getByDisplayValue("ACCOUNT-999-TEST")).toBeInTheDocument();
  });

  test("4. Карточка счета: отображается на экране, когда пришли данные с сервера", () => {
    mockState.accountData = {
      id: "ACC-123",
      balance: 50000,
      accountNumber: "123",
      currency: "RUB",
      status: "active",
    };
    render(<AccountsManagementPage />);

    expect(screen.getByText("ACC-123")).toBeInTheDocument();
    expect(screen.getByText("50000 RUB")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Block")).toBeInTheDocument();
  });

  test("5. Состояние загрузки: отображается лоадер, когда isLoading === true", () => {
    mockState.isLoading = true;
    render(<AccountsManagementPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("ACC-123")).not.toBeInTheDocument();
  });

  test("6. Состояние ошибки: выводится сообщение об ошибке, если сервер ответил сбоем", () => {
    mockState.isError = true;
    mockState.errorData = { message: "Случилась кастомная ошибка сервера!" };
    render(<AccountsManagementPage />);

    expect(screen.getByText(/Случилась кастомная ошибка/)).toBeInTheDocument();
    expect(screen.queryByText("ACC-123")).not.toBeInTheDocument();
  });

  test("7. Блокировка счета: клик по кнопке вызывает мутацию на сервере и unwrap", async () => {
    const user = userEvent.setup();

    mockState.accountData = {
      id: "ACC-555",
      balance: 100,
      accountNumber: "555",
      currency: "USD",
      status: "active",
    };

    render(<AccountsManagementPage />);

    const blockBtn = screen.getByText("Block");
    expect(blockBtn).toBeInTheDocument();
    expect(blockBtn).not.toBeDisabled();

    await user.click(blockBtn);

    expect(mockBlockAccountMutation).toHaveBeenCalledTimes(1);
    expect(mockBlockAccountMutation).toHaveBeenCalledWith({
      id: "ACC-555",
    });
    expect(mockUnwrap).toHaveBeenCalledTimes(1);
  });

  test("8. Заблокированный счет нельзя повторно блокировать (кнопка disabled)", () => {
    mockState.accountData = {
      id: "ACC-777",
      balance: 0,
      accountNumber: "777",
      currency: "RUB",
      status: "blocked",
    };
    render(<AccountsManagementPage />);

    const blockBtn = screen.getByText("Block");
    expect(blockBtn).toBeInTheDocument();
    expect(screen.getByText("Blocked")).toBeInTheDocument();
  });
});
