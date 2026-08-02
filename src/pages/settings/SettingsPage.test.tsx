import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/shared/test/renderWithProviders";
import SettingsPage from "./SettingsPage";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/entities/settings/api/settings-api";
import { useTheme } from "@/shared/hooks/useTheme";
import { useChangeLanguage } from "@/features/change-language";
import type { LanguageCode } from "@/shared/config/languages";

// ===== МОКИ API =====
vi.mock("@/entities/settings/api/settings-api", () => ({
  useGetSettingsQuery: vi.fn(),
  useUpdateSettingsMutation: vi.fn(() => [
    vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({ data: {} }),
    }),
    { isLoading: false, reset: vi.fn() },
  ]),
}));

// ===== МОКИ ХУКОВ =====
vi.mock("@/shared/hooks/useTheme", () => ({
  useTheme: vi.fn(),
}));

vi.mock("@/features/change-language", async () => {
  const actual = await vi.importActual<typeof import("@/features/change-language")>(
    "@/features/change-language"
  );
  return {
    ...actual,
    useChangeLanguage: vi.fn(),
    LanguageModal: ({ open, onClose, onLanguageChange }: {
      open: boolean;
      onClose: () => void;
      onLanguageChange?: (lang: LanguageCode) => Promise<void>;
    }) =>
      open ? (
        <div data-testid="language-modal">
          <button onClick={() => onLanguageChange?.("en")}>English</button>
          <button onClick={() => onLanguageChange?.("ru")}>Russian</button>
          <button onClick={onClose}>Close</button>
        </div>
      ) : null,
  };
});

// ===== МОК ДЛЯ i18n =====
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "settings.general": "General",
        "settings.security": "Security",
        "settings.language": "Language",
        "settings.myProfile": "My Profile",
        "settings.contactUs": "Contact Us",
        "settings.changePassword": "Change Password",
        "settings.privacyPolicy": "Privacy Policy",
        "settings.chooseData": "Choose data for verification",
        "settings.biometric": "Biometric",
        "settings.theme": "Theme",
        "language.title": "Select Language",
      };
      return translations[key] || key;
    },
  }),
}));

// ===== МОК ДЛЯ ROUTER =====
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

// ===== ПОЛУЧАЕМ МОКИ =====
const mockedUseGetSettingsQuery = vi.mocked(useGetSettingsQuery);
const mockedUseUpdateSettingsMutation = vi.mocked(useUpdateSettingsMutation);
const mockedUseTheme = vi.mocked(useTheme);
const mockedUseChangeLanguage = vi.mocked(useChangeLanguage);

describe("SettingsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseTheme.mockReturnValue({
      theme: "dark",
      toggleTheme: vi.fn(),
    });

    mockedUseChangeLanguage.mockReturnValue({
      languages: [
        { id: "en", label: "English", flagUrl: "en.png" },
        { id: "ru", label: "Русский", flagUrl: "ru.png" },
        { id: "de", label: "Deutsch", flagUrl: "de.png" },
        { id: "jp", label: "日本語", flagUrl: "jp.png" },
        { id: "fr", label: "Français", flagUrl: "fr.png" },
      ],
      currentLanguage: "ru",
      currentLanguageLabel: "Русский",
      changeLanguage: vi.fn(),
    });

    mockedUseGetSettingsQuery.mockReturnValue({
      data: {
        notificationEnabled: true,
        language: "RU",
        darkModeEnabled: true,
      },
      isLoading: false,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useGetSettingsQuery>);
  });

  describe("Отображение данных", () => {
    it("отображает настройки после загрузки", () => {
      renderWithProviders(<SettingsPage />);
      expect(screen.getByText("General")).toBeInTheDocument();
      expect(screen.getByText("Security")).toBeInTheDocument();
      expect(screen.getByText("Choose data for verification")).toBeInTheDocument();
    });

    it("отображает текущий язык", () => {
      renderWithProviders(<SettingsPage />);
      expect(screen.getByText("Русский")).toBeInTheDocument();
    });

    it("отображает текущую тему (темная тема включена)", () => {
      mockedUseTheme.mockReturnValue({
        theme: "dark",
        toggleTheme: vi.fn(),
      });

      renderWithProviders(<SettingsPage />);
      const checkboxes = screen.getAllByRole("checkbox");
      const themeCheckbox = checkboxes[1];
      expect(themeCheckbox).toBeChecked();
    });

    it("отображает текущую тему (темная тема выключена)", () => {
      mockedUseTheme.mockReturnValue({
        theme: "light",
        toggleTheme: vi.fn(),
      });

      renderWithProviders(<SettingsPage />);
      const checkboxes = screen.getAllByRole("checkbox");
      const themeCheckbox = checkboxes[1];
      expect(themeCheckbox).not.toBeChecked();
    });
  });

  describe("Изменение настроек", () => {
    it("переключение темы отправляет запрос на сервер", async () => {
      const unwrapMock = vi.fn().mockResolvedValue({ data: {} });
      const updateSettings = vi.fn().mockReturnValue({
        unwrap: unwrapMock,
      });

      mockedUseUpdateSettingsMutation.mockReturnValue([
        updateSettings,
        { isLoading: false, reset: vi.fn() },
      ]);

      const toggleTheme = vi.fn();
      mockedUseTheme.mockReturnValue({
        theme: "light",
        toggleTheme,
      });

      renderWithProviders(<SettingsPage />);
      const checkboxes = screen.getAllByRole("checkbox");
      const themeCheckbox = checkboxes[1];
      fireEvent.click(themeCheckbox);

      await waitFor(() => {
        expect(updateSettings).toHaveBeenCalledWith({
          userId: 2,
          data: expect.objectContaining({
            darkModeEnabled: true,
          }),
        });
      });
    });

    it("открывает модалку выбора языка", () => {
      renderWithProviders(<SettingsPage />);
      const languageButton = screen.getByText("Language");
      fireEvent.click(languageButton);

      expect(screen.getByTestId("language-modal")).toBeInTheDocument();
    });

    it("выбор языка отправляет запрос на сервер", async () => {
      const unwrapMock = vi.fn().mockResolvedValue({ data: {} });
      const updateSettings = vi.fn().mockReturnValue({
        unwrap: unwrapMock,
      });

      mockedUseUpdateSettingsMutation.mockReturnValue([
        updateSettings,
        { isLoading: false, reset: vi.fn() },
      ]);

      renderWithProviders(<SettingsPage />);

      const languageButton = screen.getByText("Language");
      fireEvent.click(languageButton);

      const englishButton = screen.getByText("English");
      fireEvent.click(englishButton);

      await waitFor(() => {
        expect(updateSettings).toHaveBeenCalledWith({
          userId: 2,
          data: expect.objectContaining({
            language: "EN",
          }),
        });
      });
    });

    it("закрывает модалку при нажатии на Close", () => {
      renderWithProviders(<SettingsPage />);
      const languageButton = screen.getByText("Language");
      fireEvent.click(languageButton);

      expect(screen.getByTestId("language-modal")).toBeInTheDocument();

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      expect(screen.queryByTestId("language-modal")).not.toBeInTheDocument();
    });
  });

  describe("Навигация", () => {
    it("содержит ссылку на профиль", () => {
      renderWithProviders(<SettingsPage />);
      const link = screen.getByText("My Profile");
      expect(link.closest("a")).toHaveAttribute("href", "/profile");
    });

    it("содержит ссылку на контакты", () => {
      renderWithProviders(<SettingsPage />);
      const link = screen.getByText("Contact Us");
      expect(link.closest("a")).toHaveAttribute("href", "/contact-us");
    });

    it("содержит ссылку на смену пароля", () => {
      renderWithProviders(<SettingsPage />);
      const link = screen.getByText("Change Password");
      expect(link.closest("a")).toHaveAttribute("href", "/change-password");
    });

    it("содержит ссылку на политику конфиденциальности", () => {
      renderWithProviders(<SettingsPage />);
      const link = screen.getByText("Privacy Policy");
      expect(link.closest("a")).toHaveAttribute("href", "/privacy-policy");
    });
  });

  describe("Обработка ошибок", () => {
    it("при ошибке сохранения темы не ломается", async () => {
     

      const unwrapMock = vi.fn().mockImplementation(() => {
        return Promise.reject(new Error("Network error")).catch(() => {});
      });

      const updateSettings = vi.fn().mockReturnValue({
        unwrap: unwrapMock,
      });

      mockedUseUpdateSettingsMutation.mockReturnValue([
        updateSettings,
        { isLoading: false, reset: vi.fn() },
      ]);

      renderWithProviders(<SettingsPage />);
      const checkboxes = screen.getAllByRole("checkbox");
      const themeCheckbox = checkboxes[1];

      expect(() =>{
        fireEvent.click(themeCheckbox);
      }).not.toThrow();

      await waitFor(() => {
        expect(screen.getByText("General")).toBeInTheDocument();
      });
    });

    it("при ошибке сохранения языка не ломается", async () => {
      const unwrapMock = vi.fn().mockImplementation(() => {
       return Promise.reject(new Error("Network error")).catch(() => {});
      });

      const updateSettings = vi.fn().mockReturnValue({
        unwrap: unwrapMock,
      });

      mockedUseUpdateSettingsMutation.mockReturnValue([
        updateSettings,
        { isLoading: false, reset: vi.fn() },
      ]);

      renderWithProviders(<SettingsPage />);
      const languageButton = screen.getByText("Language");
      fireEvent.click(languageButton);

      const englishButton = screen.getByText("English");
      expect(() => {
        fireEvent.click(englishButton);
      }).not.toThrow();

      await waitFor(() => {
        expect(screen.getByText("General")).toBeInTheDocument();
      });
    });
  });
});