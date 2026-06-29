import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatisticChart from "../StatisticChart";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common.loading": "Loading...",
        "accountsManagement.balance": "Balance",
      };
      return translations[key] || key;
    },
  }),
}));

describe("StatisticChart", () => {
  it("отображает переданный баланс", () => {
    render(
      <StatisticChart
        balance={{ currency: "USD", balance: 1234.56 }}
        isLoading={false}
        error={null}
      />
    );
    expect(screen.getByText("USD 1234.56")).toBeInTheDocument();
  });

  it("показывает fallback при отсутствии баланса", () => {
    render(<StatisticChart balance={undefined} isLoading={false} error={null} />);
    expect(screen.getByText("$8,545.00")).toBeInTheDocument();
  });

  it("показывает состояние загрузки", () => {
    render(<StatisticChart isLoading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("показывает ошибку", () => {
    render(<StatisticChart error={new Error("Network error")} />);
    expect(screen.getByText("Ошибка загрузки")).toBeInTheDocument();
  });
});