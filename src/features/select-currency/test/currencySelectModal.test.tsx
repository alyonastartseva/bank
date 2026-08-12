import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { CurrencySelectModal } from "../ui/CurrencySelectModal";
import type { CurrencyCode } from "@/entities/currency";
import { mockCurrencies, mockT } from "./mocks/currencySelectModal.mocks";

// --- Моки

vi.mock("@/entities/currency", async () => {
  const { mockCurrencies } = await import("./mocks/currencySelectModal.mocks");
  return {
    currencies: mockCurrencies,
  };
});

vi.mock("react-i18next", async () => {
  const { mockT } = await import("./mocks/currencySelectModal.mocks");
  return {
    useTranslation: () => ({ t: mockT }),
  };
});

// --- Хелперы

const defaultProps = {
  open: true,
  selectedCode: "USD" as CurrencyCode,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
};

const currencies = mockCurrencies.map((c) => c.code);

function renderModal(props: Partial<typeof defaultProps> = {}) {
  return render(<CurrencySelectModal {...defaultProps} {...props} />);
}

function getCurrencyRow(code: string) {
  return screen.getByRole("button", { name: new RegExp(code) });
}

function expectCurrencyChecked(code: string, isChecked: boolean = true) {
  const row = getCurrencyRow(code);
  const icon = within(row).queryByTestId("CheckCircleRoundedIcon");

  if (isChecked) {
    expect(icon).toBeInTheDocument();
  } else {
    expect(icon).not.toBeInTheDocument();
  }
}

// --- Тесты

describe("CurrencySelectModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("рендер", () => {
    it("рендерит контент модалки при открытии", () => {
      renderModal();

      expect(screen.getByText("Выберите валюту")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Поиск валюты")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Готово" })).toBeInTheDocument();
    });

    it("рендерит все валюты", () => {
      renderModal();

      mockCurrencies.forEach((currency) => {
        expect(screen.getByText(currency.code)).toBeInTheDocument();
        expect(screen.getByText(mockT(currency.nameKey))).toBeInTheDocument();
      });
    });

    it("не рендерит контент, когда модалка закрыта", () => {
      renderModal({ open: false });

      expect(screen.queryByText("Выберите валюту")).not.toBeInTheDocument();
    });
  });

  describe("выбор валюты", () => {
    it("при открытии модалки выбрана валюта по-умолчанию", () => {
      renderModal({ selectedCode: "USD" });
      expectCurrencyChecked("USD");
    });

    it("при клике на другую валюту меняет выбор", async () => {
      const user = userEvent.setup();
      renderModal({ selectedCode: "USD" });

      await user.click(getCurrencyRow("EUR"));

      expectCurrencyChecked("EUR", true);
      expectCurrencyChecked("USD", false);
    });

    it("вызывает onConfirm с выбранной валютой при клике на кнопку Готово", async () => {
      const user = userEvent.setup();
      renderModal({ selectedCode: "USD" });

      await user.click(getCurrencyRow("JPY"));
      await user.click(screen.getByRole("button", { name: "Готово" }));

      expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
      expect(defaultProps.onConfirm).toHaveBeenCalledWith("JPY");
    });
  });

  describe("поиск", () => {
    it("фильтрует по коду валюты и не зависит от регистра", async () => {
      const user = userEvent.setup();
      renderModal();

      await user.type(screen.getByPlaceholderText("Поиск валюты"), "jp");

      currencies
        .filter((code) => code !== "JPY")
        .forEach((code) => {
          expect(screen.queryByText(code)).not.toBeInTheDocument();
        });
    });

    it("фильтрует по названию валюты и не зависит от регистра", async () => {
      const user = userEvent.setup();
      renderModal();

      await user.type(screen.getByPlaceholderText("Поиск валюты"), "фу");

      expect(screen.getByText("Фунт стерлингов")).toBeInTheDocument();
      currencies
        .filter((code) => code !== "GBP")
        .forEach((code) => {
          expect(screen.queryByText(code)).not.toBeInTheDocument();
        });
    });

    it("показывает все валюты после очистки поиска", async () => {
      const user = userEvent.setup();
      renderModal();

      const input = screen.getByPlaceholderText("Поиск валюты");
      await user.type(input, "фу");
      await user.clear(input);

      currencies.forEach((code) => {
        expect(screen.getByText(code)).toBeInTheDocument();
      });
    });

    it("ничего не показывает, если такой валюты нет", async () => {
      const user = userEvent.setup();
      renderModal();

      await user.type(screen.getByPlaceholderText("Поиск валюты"), "симолеон");

      currencies.forEach((code) => {
        expect(screen.queryByText(code)).not.toBeInTheDocument();
      });
    });
  });

  describe("выход из модалки", () => {
    it("вызывает onClose при клике на кнопку назад", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderModal({ onClose });

      const backIcon = screen.getByTestId("ArrowBackIosNewRoundedIcon");
      await user.click(backIcon.closest("button")!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("вызывает onClose при нажатии на клавишу Escape", async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      renderModal({ onClose });

      await user.keyboard("{Escape}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
