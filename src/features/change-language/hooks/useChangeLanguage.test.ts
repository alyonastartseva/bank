import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useChangeLanguage } from "./useChangeLanguage";
import { SUPPORTED_LANGUAGES } from "@/shared/config/languages";

const changeLanguageMock = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en",
      resolvedLanguage: "en",
      changeLanguage: changeLanguageMock,
    },
  }),
}));

describe("useChangeLanguage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает список всех поддерживаемых языков", () => {
    const { result } = renderHook(() => useChangeLanguage());

    expect(result.current.languages).toHaveLength(SUPPORTED_LANGUAGES.length);

    expect(result.current.languages.map((lang) => lang.id)).toEqual(SUPPORTED_LANGUAGES);
  });

  it("возвращает текущий язык", () => {
    const { result } = renderHook(() => useChangeLanguage());

    expect(result.current.currentLanguage).toBe("en");
    expect(result.current.currentLanguageLabel).toBe("language.en");
  });

  it.each(SUPPORTED_LANGUAGES)("вызывает changeLanguage для языка %s", (language) => {
    const { result } = renderHook(() => useChangeLanguage());

    result.current.changeLanguage(language);

    expect(changeLanguageMock).toHaveBeenCalledWith(language);
  });
});
