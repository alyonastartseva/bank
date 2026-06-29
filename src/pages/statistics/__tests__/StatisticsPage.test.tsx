import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import StatisticsPage from "../StatisticsPage";
import { useGetBalanceQuery } from "@/entities/account/api/account-api";

vi.mock("@/widgets/transaction-list/TransactionList", () => ({
  default: () => <div data-testid="mock-transaction-list">Mock Transaction List</div>,
}));

vi.mock("@/widgets/transactionTable/TransactionTable", () => ({
  default: () => <div data-testid="mock-transaction-table">Mock Transaction Table</div>,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common.loading": "Loading...",
        "errors.balanceLoadFailed": "Failed to load balance",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("@/entities/account/api/account-api", () => ({
  useGetBalanceQuery: vi.fn(),
}));

const mockUseGetBalanceQuery = vi.mocked(useGetBalanceQuery);

describe("StatisticsPage", () => {
  it("отображает баланс, если он получен", () => {
    mockUseGetBalanceQuery.mockReturnValue({
      data: { amount: 1500, currency: "RUB" },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <BrowserRouter>
        <StatisticsPage />
      </BrowserRouter>
    );

    expect(screen.getByText("RUB 1500.00")).toBeInTheDocument();
  });

  it("показывает индикатор загрузки", () => {
    mockUseGetBalanceQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    render(
      <BrowserRouter>
        <StatisticsPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it("показывает ошибку, если запрос баланса упал", () => {
    mockUseGetBalanceQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Network error"),
      refetch: vi.fn(),
    });

    render(
      <BrowserRouter>
        <StatisticsPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Ошибка загрузки")).toBeInTheDocument();
  });
});