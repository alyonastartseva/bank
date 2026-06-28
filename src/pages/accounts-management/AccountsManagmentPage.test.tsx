import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach } from "vitest";
import AccountsManagementPage from "./AccountsManagementPage";

interface Account {
  id: string;
  balance: number;
  accountNumber: string;
  currency: string;
  status: string;
}

interface AccountCardProps {
  id: string;
  balance: number;
  accountNumber: string;
  currency: string;
  status: string;
  onBlock: () => void;
  disabled: boolean;
}

let mockAccountData: Account | null = null;
let mockIsLoading = false;
let mockIsError = false;
let mockErrorData: { message: string } | null = null;

const mockUnwrap = vi.fn(() => Promise.resolve());
const mockBlockAccountMutation = vi.fn(() => ({
  unwrap: mockUnwrap,
}));

vi.mock("@/entities/account/api/account-api", () => ({
  useGetAccountByIdQuery: vi.fn(() => ({
    data: mockAccountData,
    isLoading: mockIsLoading,
    isError: mockIsError,
    error: mockErrorData,
  })),
  useCreateAccountMutation: () => [vi.fn()],
  useBlockAccountMutation: () => [mockBlockAccountMutation],
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/features/add-account/AddAccountModal", () => ({
  AddAccountModal: ({ open, onClose }: { open: boolean; onClose: () => void }) =>
    open ? (
      <div data-testid="mock-modal">
        <button onClick={onClose}>accountsManagement.closeModal</button>
      </div>
    ) : null,
}));

vi.mock("@/entities/account/ui/AccountCard", () => ({
  default: ({ id, balance, status, onBlock, disabled }: AccountCardProps) => (
    <div data-testid="account-card">
      <span>Card ID: {id}</span>
      <span>Status: {status}</span>
      <span>Balance: {balance}</span>
      <button
        data-testid="block-btn"
        onClick={onBlock}
        disabled={disabled || status === "blocked"}
      >
        Block
      </button>
    </div>
  ),
}));

describe("Тестирование админской панели управления счетами", () => {
  beforeEach(() => {
    mockAccountData = null;
    mockIsLoading = false;
    mockIsError = false;
    mockErrorData = null;

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    vi.clearAllMocks();
  });

  test("1. Базовый рендеринг: все элементы управления на месте", () => {
    render(<AccountsManagementPage />);
    expect(screen.getByText("accountsManagement.title")).toBeInTheDocument();
    expect(screen.getByText("accountsManagement.createAccount")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("accountsManagement.searchPlaceholder")
    ).toBeInTheDocument();
    expect(screen.getByText("accountsManagement.load")).toBeInTheDocument();
  });

  test("2. Модалка: клик по кнопке создания открывает и закрывает окно", async () => {
    const user = userEvent.setup();
    render(<AccountsManagementPage />);

    const openBtn = screen.getByText("accountsManagement.createAccount");
    await user.click(openBtn);
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();

    const closeBtn = screen.getByText("accountsManagement.closeModal");
    await user.click(closeBtn);
    expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
  });

  test("3. Поиск: текст в инпуте корректно меняется при вводе", async () => {
    const user = userEvent.setup();
    render(<AccountsManagementPage />);

    const input = screen.getByPlaceholderText("accountsManagement.searchPlaceholder");
    await user.clear(input);
    await user.type(input, "ACCOUNT-999-TEST");

    expect(screen.getByDisplayValue("ACCOUNT-999-TEST")).toBeInTheDocument();
  });

  test("4. Карточка счета: отображается на экране, когда пришли данные с сервера", () => {
    mockAccountData = {
      id: "ACC-123",
      balance: 50000,
      accountNumber: "123",
      currency: "RUB",
      status: "active",
    };
    render(<AccountsManagementPage />);

    expect(screen.getByTestId("account-card")).toBeInTheDocument();
    expect(screen.getByText("Card ID: ACC-123")).toBeInTheDocument();
    expect(screen.getByText("Balance: 50000")).toBeInTheDocument();
    expect(screen.getByText("Status: active")).toBeInTheDocument();
  });

  test("5. Состояние загрузки: отображается лоадер, когда isLoading === true", () => {
    mockIsLoading = true;
    render(<AccountsManagementPage />);

    expect(screen.getByText("common.loading")).toBeInTheDocument();
    expect(screen.queryByTestId("account-card")).not.toBeInTheDocument();
  });

  test("6. Состояние ошибки: выводится сообщение об ошибке, если сервер ответил сбоем", () => {
    mockIsError = true;
    mockErrorData = { message: "Случилась кастомная ошибка сервера!" };
    render(<AccountsManagementPage />);

    expect(screen.getByText(/Случилась кастомная ошибка/)).toBeInTheDocument();
    expect(screen.queryByTestId("account-card")).not.toBeInTheDocument();
  });

  test("7. Блокировка счета: клик по кнопке вызывает мутацию на сервере и unwrap", async () => {
    const user = userEvent.setup();

    mockAccountData = {
      id: "ACC-555",
      balance: 100,
      accountNumber: "555",
      currency: "USD",
      status: "active",
    };

    render(<AccountsManagementPage />);

    const blockBtn = screen.getByTestId("block-btn");

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
    mockAccountData = {
      id: "ACC-777",
      balance: 0,
      accountNumber: "777",
      currency: "RUB",
      status: "blocked",
    };
    render(<AccountsManagementPage />);

    const blockBtn = screen.getByTestId("block-btn");
    expect(blockBtn).toBeDisabled();
  });
});
