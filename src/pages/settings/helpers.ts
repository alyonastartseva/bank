/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from "vitest";
import { screen } from "@testing-library/react";

// Мокает хук useTheme/
export const mockTheme = (
  mockedUseTheme: any,
  theme: "dark" | "light" = "dark",
  toggleTheme = vi.fn()
) => {
  mockedUseTheme.mockReturnValue({ theme, toggleTheme });
};

// Мокает хук useChangeLanguage
export const mockLanguage = (
  mockedUseChangeLanguage: any,
  languages: any[],
  currentLanguage: "en" | "ru" = "ru",
  currentLanguageLabel = "Русский"
) => {
  mockedUseChangeLanguage.mockReturnValue({
    languages,
    currentLanguage,
    currentLanguageLabel,
    changeLanguage: vi.fn(),
  });
};

// Мокает хук useGetSettingsQuery
export const mockSettings = (
  mockedUseGetSettingsQuery: any,
  defaultSettings: any,
  overrides = {},
  isLoading = false
) => {
  mockedUseGetSettingsQuery.mockReturnValue({
    data: { ...defaultSettings, ...overrides },
    isLoading,
    refetch: vi.fn(),
  });
};

// Мокает хук useUpdateSettingsMutation
export const mockUpdateSettings = (
  mockedUseUpdateSettingsMutation: any,
  isLoading = false
) => {
  const updateSettings = vi.fn().mockReturnValue({
    unwrap: vi.fn().mockResolvedValue({ data: {} }),
  });
  mockedUseUpdateSettingsMutation.mockReturnValue([
    updateSettings,
    { isLoading, reset: vi.fn() },
  ]);
  return updateSettings;
};


export const getThemeCheckbox = () => screen.getAllByRole("checkbox")[1];