import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AddNewCardPage from "@/pages/add-new-card/AddNewCardPage";
import * as cardForm from "@/features/add-card/model/useCardForm";
import { useCreateAccountMutation } from "@/entities/account/api/account-api";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "addNewCard.addButton": "Добавить карту",
        "addNewCard.cancelButton": "Отмена",
        "addNewCard.cardholderNamePlaceholder": "Татьяна Миронюк",
        "addNewCard.cardNumber": "Номер карты",
        "addNewCard.expiryDate": "Срок действия",
        "addNewCard.CVV": "4-значный CVV",
        "common.loading": "Загрузка...",
        "errors.createAccountFailed": "Ошибка при создании счета",
        "errors.maxAccountsReached": "Достигнуто максимальное количество счетов (5)",
        "accountsManagement.balance": "Баланс",
      };
      return translations[key] || key;
    },
    i18n: { language: "ru", changeLanguage: vi.fn() },
  }),
}));

vi.mock("@/entities/account/api/account-api", () => ({
  useCreateAccountMutation: vi.fn(),
}));

vi.mock("@/features/add-card/model/useCardForm", () => ({
  useCardForm: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockUseCreateAccountMutation = vi.mocked(useCreateAccountMutation);
const mockUseCardForm = vi.mocked(cardForm.useCardForm);
const mockUseNavigate = vi.mocked(useNavigate);

describe("AddNewCardPage", () => {
  const mockCreateAccount = vi.fn();
  const mockSubmitForm = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCreateAccountMutation.mockReturnValue([
      mockCreateAccount,
      { isLoading: false, reset: vi.fn() },
    ]);

    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUseCardForm.mockReturnValue({
      formData: {
        cardholderName: "Test User",
        cardNumber: "4111111111111111",
        expiryDate: "12/25",
        cvv: "123",
      },
      errors: {},
      handleChange: vi.fn(),
      submitForm: mockSubmitForm,
    });
  });

  it("вызывает createAccount с правильными данными и переходит на статистику", async () => {
    const user = userEvent.setup();
    const mockData = { externalId: "test-123", id: "test-123" };

    const createSuccess = () => {
      const promise = Promise.resolve(mockData);
      Object.assign(promise, { unwrap: () => Promise.resolve(mockData) });
      return promise;
    };
    mockCreateAccount.mockImplementation(createSuccess);

    mockSubmitForm.mockImplementation((callback) => {
      callback({
        cardholderName: "Test User",
        cardNumber: "4111111111111111",
        expiryDate: "12/25",
        cvv: "123",
      });
    });

    render(
      <BrowserRouter>
        <AddNewCardPage />
      </BrowserRouter>
    );

    await user.click(screen.getByRole("button", { name: /Добавить карту/i }));

    await waitFor(() => {
      expect(mockCreateAccount).toHaveBeenCalledWith({
        userId: "1",
        initialBalance: 1000,
        currency: "RUB",
        accountType: "CHECKING",
      });
    });

    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith("/statistics?accountId=test-123");
      },
      { timeout: 2000 }
    );
  });

  it("показывает ошибку 409 (лимит счетов)", async () => {
    const user = userEvent.setup();
    const error = {
      status: 409,
      data: { message: "User has reached maximum number of accounts: 5" },
    };

    const createError = () => {
      const promise = Promise.reject(error);
      Object.assign(promise, { unwrap: () => Promise.reject(error) });
      return promise;
    };
    mockCreateAccount.mockImplementation(createError);

    mockSubmitForm.mockImplementation((callback) => {
      callback({
        cardholderName: "Test User",
        cardNumber: "4111111111111111",
        expiryDate: "12/25",
        cvv: "123",
      });
    });

    render(
      <BrowserRouter>
        <AddNewCardPage />
      </BrowserRouter>
    );

    await user.click(screen.getByRole("button", { name: /Добавить карту/i }));

    await waitFor(() => {
      expect(screen.getByText(/У пользователя уже 5 счетов/i)).toBeInTheDocument();
    });
  });

  it("показывает ошибку 404 (пользователь не найден)", async () => {
    const user = userEvent.setup();
    const error = { status: 404 };

    const createError = () => {
      const promise = Promise.reject(error);
      Object.assign(promise, { unwrap: () => Promise.reject(error) });
      return promise;
    };
    mockCreateAccount.mockImplementation(createError);

    mockSubmitForm.mockImplementation((callback) => {
      callback({
        cardholderName: "Test User",
        cardNumber: "4111111111111111",
        expiryDate: "12/25",
        cvv: "123",
      });
    });

    render(
      <BrowserRouter>
        <AddNewCardPage />
      </BrowserRouter>
    );

    await user.click(screen.getByRole("button", { name: /Добавить карту/i }));

    await waitFor(() => {
      expect(screen.getByText(/Пользователь не найден/i)).toBeInTheDocument();
    });
  });
});
