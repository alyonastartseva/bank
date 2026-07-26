import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import { LanguageModal } from "./LanguageModal";

const changeLanguageMock = vi.fn();
const onCloseMock = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../hooks/useChangeLanguage", () => ({
  useChangeLanguage: () => ({
    currentLanguage: "en",
    languages: [
      {
        id: "en",
        label: "English",
        flagUrl: "en.png",
      },
      {
        id: "ru",
        label: "Русский",
        flagUrl: "ru.png",
      },
      {
        id: "de",
        label: "Deutsch",
        flagUrl: "de.png",
      },
    ],
    changeLanguage: changeLanguageMock,
  }),
}));

describe("LanguageModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("отображает заголовок и список языков", () => {
    renderWithProviders(
      <LanguageModal open onClose={onCloseMock} />
  );

    expect(screen.getByText("language.title")).toBeInTheDocument();

    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Русский")).toBeInTheDocument();
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });

  it("при выборе языка вызывает changeLanguage", () => {
    renderWithProviders(
      <LanguageModal open onClose={onCloseMock} />
  );

    fireEvent.click(screen.getByText("Русский"));

    expect(changeLanguageMock).toHaveBeenCalledTimes(1);
    expect(changeLanguageMock).toHaveBeenCalledWith("ru");
  });

  it("после выбора языка закрывает модальное окно", () => {
    renderWithProviders(
      <LanguageModal open onClose={onCloseMock} />
  );

    fireEvent.click(screen.getByText("Русский"));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("не отображается при open=false", () => {
    renderWithProviders(
      <LanguageModal open={false} onClose={onCloseMock} />
  );

    expect(screen.queryByText("English")).not.toBeInTheDocument();
    expect(screen.queryByText("Русский")).not.toBeInTheDocument();
  });
});