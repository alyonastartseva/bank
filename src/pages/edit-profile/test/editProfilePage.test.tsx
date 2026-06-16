import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useGetUserQuery } from '@/entities/user/api/user-api';
import { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } from '@/entities/kyc/kyc-api';
import { renderWithProviders } from '@/shared/test/renderWithProviders';
import EditProfilePage from '@/pages/edit-profile/ui/EditProfilePage';

// Импортируем реальные русские переводы
import ruTranslations from '@/locales/ru/translation.json';

// Мокаем react-i18next с использованием реальных переводов и правильной интерполяцией
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      // Рекурсивный поиск перевода по ключу (например, "editProfile.title")
      const parts = key.split('.');
      let value: any = ruTranslations;
      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          value = key;
          break;
        }
      }
      let result = value || key;
      // Интерполяция параметров: заменяем как {param}, так и {{param}}
      if (params && typeof params === 'object') {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          // Ищем как {paramKey} так и {{paramKey}} (с возможными пробелами внутри)
          const regex = new RegExp(`\\{\\{?\\s*${paramKey}\\s*\\}?\\}`, 'g');
          result = result.replace(regex, String(paramValue));
        });
      }
      return result;
    },
    i18n: { language: 'ru', changeLanguage: vi.fn() },
  }),
  Trans: ({ children }: any) => children,
}));

// Моки для API-хуков (как и раньше)
vi.mock('@/entities/user/api/user-api', () => ({
  useGetUserQuery: vi.fn(),
}));
vi.mock('@/entities/kyc/kyc-api', () => ({
  useStartKycMutation: vi.fn(),
  useGetKycStatusQuery: vi.fn(),
  useUploadDocumentMutation: vi.fn(),
}));

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
  } as any);

  mockedUseStartKycMutation.mockReturnValue([
    vi.fn().mockResolvedValue({ data: {} }),
    { isLoading: false },
  ] as any);

  mockedUseUploadDocumentMutation.mockReturnValue([
    vi.fn().mockResolvedValue({ data: {} }),
    { isLoading: false },
  ] as any);
});

function renderEditProfilePage() {
  return renderWithProviders(<EditProfilePage />);
}

describe('editProfilePageTests', () => {
  it('Если isLoading = true, то на странице есть только CircularProgress', () => {
    mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: true } as any);
    renderEditProfilePage();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  describe('Рендер полей заголовков', () => {
    it('Рендер Edit Profile', () => {
      mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
      renderEditProfilePage();
      expect(screen.getByRole('heading', { name: /Редактировать профиль/i })).toBeInTheDocument();
    });
    it('Рендер Full Name', () => {
      mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
      renderEditProfilePage();
      expect(screen.getByText('Полное имя')).toBeInTheDocument();
    });
    it('Рендер Email Address', () => {
      mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
      renderEditProfilePage();
      expect(screen.getByText('Электронная почта')).toBeInTheDocument();
    });
    it('Рендер Phone Number', () => {
      mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
      renderEditProfilePage();
      expect(screen.getByText('Номер телефона')).toBeInTheDocument();
    });
    it('рендер Birth Date', () => {
      mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
      renderEditProfilePage();
      expect(screen.getByText('Дата рождения')).toBeInTheDocument();
    });
  });

  describe('Рендер статических данных, независимых от сервера', () => {
    it('Рендер даты дня рождения', () => {
      mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
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
        } as any);
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
        mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
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
      mockedUseGetUserQuery.mockReturnValue({ data: undefined, isLoading: false } as any);
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
      // После исправления интерполяции в моке должно быть "Присоединился 28 Jan 2021"
      expect(screen.getByText(/Присоединился 28 Jan 2021/i)).toBeInTheDocument();
    });
  });
});