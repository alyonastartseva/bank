import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useGetUserQuery } from '@/entities/user/api/user-api';
import { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } from '@/entities/kyc/kyc-api';
import { renderWithProviders } from '@/shared/test/renderWithProviders';
import EditProfilePage from '@/pages/edit-profile/ui/EditProfilePage';
import ruTranslations from '@/locales/ru/translation.json';

type TranslationParams = Record<string, string | number>;

// Мокаем react-i18next с реальными переводами и интерполяцией
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: TranslationParams) => {
      const parts = key.split('.');
      let value: unknown = ruTranslations;
      for (const part of parts) {
        if (value && typeof value === 'object' && part in (value as Record<string, unknown>)) {
          value = (value as Record<string, unknown>)[part];
        } else {
          value = key;
          break;
        }
      }
      let result = String(value ?? key);
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          const regex = new RegExp(`\\{\\{?\\s*${paramKey}\\s*\\}?\\}`, 'g');
          result = result.replace(regex, String(paramValue));
        });
      }
      return result;
    },
    i18n: { language: 'ru', changeLanguage: vi.fn() },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
}));

// Моки API-хуков
vi.mock('@/entities/user/api/user-api', () => ({
  useGetUserQuery: vi.fn(),
}));
vi.mock('@/entities/kyc/kyc-api', () => ({
  useStartKycMutation: vi.fn(),
  useGetKycStatusQuery: vi.fn(),
  useUploadDocumentMutation: vi.fn(),
}));

type MockedGetUserQuery = ReturnType<typeof useGetUserQuery>;
type MockedStartKyc = ReturnType<typeof useStartKycMutation>;
type MockedGetKycStatus = ReturnType<typeof useGetKycStatusQuery>;
type MockedUploadDocument = ReturnType<typeof useUploadDocumentMutation>;

const mockedUseGetUserQuery = vi.mocked(useGetUserQuery);
const mockedUseStartKycMutation = vi.mocked(useStartKycMutation);
const mockedUseGetKycStatusQuery = vi.mocked(useGetKycStatusQuery);
const mockedUseUploadDocumentMutation = vi.mocked(useUploadDocumentMutation);

beforeEach(() => {
  vi.clearAllMocks();

  mockedUseGetKycStatusQuery.mockReturnValue({
    data: undefined,
    error: { status: 404 },
    refetch: vi.fn(),
    isError: true,
    isLoading: false,
  } as unknown as MockedGetKycStatus);

  mockedUseStartKycMutation.mockReturnValue([
    vi.fn().mockResolvedValue({ data: {} }),
    { isLoading: false },
  ] as unknown as MockedStartKyc);

  mockedUseUploadDocumentMutation.mockReturnValue([
    vi.fn().mockResolvedValue({ data: {} }),
    { isLoading: false },
  ] as unknown as MockedUploadDocument);
});

function renderEditProfilePage() {
  return renderWithProviders(<EditProfilePage />);
}

describe('editProfilePageTests', () => {
  it('Если isLoading = true, то на странице есть только CircularProgress', () => {
    mockedUseGetUserQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as unknown as MockedGetUserQuery);
    renderEditProfilePage();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  describe('Рендер полей заголовков', () => {
    it('Рендер Edit Profile', () => {
      mockedUseGetUserQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
      } as unknown as MockedGetUserQuery);
      renderEditProfilePage();
      expect(screen.getByRole('heading', { name: /Редактировать профиль/i })).toBeInTheDocument();
    });
    it('Рендер Full Name', () => {
      mockedUseGetUserQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
      } as unknown as MockedGetUserQuery);
      renderEditProfilePage();
      expect(screen.getByText('Полное имя')).toBeInTheDocument();
    });
    it('Рендер Email Address', () => {
      mockedUseGetUserQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
      } as unknown as MockedGetUserQuery);
      renderEditProfilePage();
      expect(screen.getByText('Электронная почта')).toBeInTheDocument();
    });
    it('Рендер Phone Number', () => {
      mockedUseGetUserQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
      } as unknown as MockedGetUserQuery);
      renderEditProfilePage();
      expect(screen.getByText('Номер телефона')).toBeInTheDocument();
    });
    it('рендер Birth Date', () => {
      mockedUseGetUserQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
      } as unknown as MockedGetUserQuery);
      renderEditProfilePage();
      expect(screen.getByText('Дата рождения')).toBeInTheDocument();
    });
  });

  describe('Рендер статических данных, независимых от сервера', () => {
    it('Рендер даты дня рождения', () => {
      mockedUseGetUserQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
      } as unknown as MockedGetUserQuery);
      renderEditProfilePage();
      expect(screen.getByText('28')).toBeInTheDocument();
      expect(screen.getByText(/September/i)).toBeInTheDocument();
      expect(screen.getByText('2000')).toBeInTheDocument();
    });
  });

  describe('Рендер переменных, которые получают данные от сервера', () => {
    describe('При наличии данных', () => {
      beforeEach(() => {
        mockedUseGetUserQuery.mockReturnValue({
          data: { fullName: 'Иванов', role: 'Senior Frontend', email: 'charge@gmail.com' },
          isLoading: false,
        } as unknown as MockedGetUserQuery);
      });
      it('fullName отображается', () => {
        renderEditProfilePage();
        expect(screen.getByRole('heading', { name: /Иванов/i })).toBeInTheDocument();
      });
      it('email отображается', () => {
        renderEditProfilePage();
        expect(screen.getByText('charge@gmail.com')).toBeInTheDocument();
      });
      it('role отображается', () => {
        renderEditProfilePage();
        expect(screen.getByText('Senior Frontend')).toBeInTheDocument();
      });
    });

    describe('При отсутствии данных', () => {
      beforeEach(() => {
        mockedUseGetUserQuery.mockReturnValue({
          data: undefined,
          isLoading: false,
        } as unknown as MockedGetUserQuery);
      });
      it('Альт картинки = User', () => {
        renderEditProfilePage();
        expect(screen.getByAltText(/User/i)).toBeInTheDocument();
      });
      it('Роль юзера = Senior Designer (значение по умолчанию)', () => {
        renderEditProfilePage();
        expect(screen.getByText('Senior Designer')).toBeInTheDocument();
      });
    });
  });

  describe('Рендер переменных из мока внутри компонента', () => {
    beforeEach(() => {
      mockedUseGetUserQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
      } as unknown as MockedGetUserQuery);
    });
    it('Рендер изображения пользователя', () => {
      renderEditProfilePage();
      const avatar = screen.getByRole('img', { name: /User/i });
      expect(avatar).toBeInTheDocument();
    });
    it('Рендер номера телефона пользователя', () => {
      renderEditProfilePage();
      expect(screen.getByText('+8801712663389')).toBeInTheDocument();
    });
    it('Рендер даты регистрации (joined) с интерполяцией', () => {
      renderEditProfilePage();
      expect(screen.getByText(/Присоединился 28 Jan 2021/i)).toBeInTheDocument();
    });
  });
});