import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { useGetUserQuery } from "@/entities/user/api/user-api.ts";
import {
  useGetKycStatusQuery,
  useStartKycMutation,
  useUploadDocumentMutation,
} from "@/entities/kyc/kyc-api";
import { renderWithProviders } from "@/shared/test/renderWithProviders.tsx";
import EditProfilePage from "@/pages/edit-profile/ui/EditProfilePage.tsx";
import { HTTP_STATUS, KYC_STATUS } from "./test-constants";
import {
  mockKycStatus,
  mockStartKyc,
  mockUploadDocument,
  setupDefaultKycMocks,
} from "./mocks/kycMocks";


// ===== МОК API С importOriginal =====
vi.mock('@/entities/user/api/user-api.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/user/api/user-api.ts')>();

  const mockUserApi ={
    reducerPath: 'userApi',
    reducer: (state = {}) => state,
    middleware: () => (next: (action: unknown) => unknown) => (action: unknown) => next(action), useGetUserQuery: vi.fn()
  };

  return {
    ...actual,
    userApi: mockUserApi,
    useGetUserQuery: mockUserApi.useGetUserQuery,
  };
});

vi.mock('@/entities/kyc/kyc-api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/entities/kyc/kyc-api')>();

  return {
    ...actual,
    useGetKycStatusQuery: vi.fn(),
    useStartKycMutation: vi.fn(() => [vi.fn(), { isLoading: false}]),
    useUploadDocumentMutation: vi.fn(() => [vi.fn(), { isLoading: false}]),
  };
});

// ===== МОК ДЛЯ i18n =====
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "editProfile.title": "Edit Profile",
        "editProfile.fullName": "Full Name",
        "editProfile.email": "Email Address",
        "editProfile.phone": "Phone Number",
        "editProfile.birthDate": "Birth Date",
        "editProfile.joined": "28 jan 2021",
        "editProfile.edit": "editProfile.edit",
      };
      return translations[key] || key;
    },
  }),
}));


const mockedUseGetUserQuery = vi.mocked(useGetUserQuery);
const mockedUseGetKycStatusQuery = vi.mocked(useGetKycStatusQuery);
const mockedUseStartKycMutation = vi.mocked(useStartKycMutation);
const mockedUseUploadDocumentMutation = vi.mocked(useUploadDocumentMutation);

// ===== ГЛОБАЛЬНЫЙ beforeEach =====
beforeEach(() => {
  vi.clearAllMocks();

  mockedUseGetUserQuery.mockReturnValue({
    data: {
      fullName: "Ivanov",
      role: "Senior Frontend",
      email: "charge@gmail.com",
    },
    isLoading: false,
    refetch: vi.fn(),
  });

  setupDefaultKycMocks(
    mockedUseGetKycStatusQuery,
    mockedUseStartKycMutation,
    mockedUseUploadDocumentMutation
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
const mockWithoutData = () => {
  mockedUseGetUserQuery.mockReturnValue({
    data: undefined,
    isLoading: false,
    refetch: vi.fn(),
  });
};

const mockWithData = () => {
  mockedUseGetUserQuery.mockReturnValue({
    data: {
      fullName: "Ivanov",
      role: "Senior Frontend",
      email: "charge@gmail.com",
    },
    isLoading: false,
    refetch: vi.fn(),
  });
};

const renderEditProfile = () => renderWithProviders(<EditProfilePage />);

const defaultTest = (isData: boolean, textToCheck: string) => {
  if (isData) mockWithData();
  else mockWithoutData();
  renderEditProfile();
  expect(screen.getByText(new RegExp(textToCheck, "i"))).toBeInTheDocument();
};

// ===== СТАРЫЕ ТЕСТЫ  =====
describe("editProfilePageTests", () => {
  it('Если "isLoading = true", то на странице есть только CircularProgress', () => {
    mockedUseGetUserQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
     refetch: vi.fn(),
    });
    renderEditProfile();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  describe("Рендер полей заголовков", () => {
    it("Рендер Edit Profile", () => {
      mockWithoutData();
      renderEditProfile();
      expect(screen.getByText("editProfile.edit")).toBeInTheDocument();  // Исправил: проверяем наличие кнопки editProfile.edit
    });
    it("Рендер Full Name", () => defaultTest(false, "Full Name"));
    it("Рендер Email Address", () => defaultTest(false, "Email Address"));
    it("Рендер Phone Number", () => defaultTest(false, "Phone Number"));
    it("рендер Birth Date", () => defaultTest(false, "Birth Date"));
  });

  describe("Рендер статических данных, независимых от сервера", () => {
    it("Рендер даты дня рождения", () => {
      mockWithoutData();
      renderEditProfile();
      expect(screen.getByText("28")).toBeInTheDocument();
      expect(screen.getByText(/september/i)).toBeInTheDocument();
      expect(screen.getByText("2000")).toBeInTheDocument();
    });
  });

  describe("Рендер переменных, которые получают данные от сервера", () => {
    describe("Рендер переменных при наличии данных от сервера", () => {
      it("Переменная fullName корректно отображается", () => {
        mockWithData();
        renderEditProfile();
        expect(screen.getByRole("heading", { name: /Ivanov/i })).toBeInTheDocument();
      });
      it("Переменная email корректно отображается", () =>
        defaultTest(true, "charge@gmail.com"));
      it("Переменная role корректно отображается", () =>
        defaultTest(true, "Senior Frontend"));
    });
    describe("Рендер переменных при отсутствии данных от сервера", () => {
      it("Альт картинки = User", () => {
        mockWithoutData();
        renderEditProfile();
        expect(screen.getByAltText(/User/i)).toBeInTheDocument();
      });
      it("Роль юзера = Senior Design", () => defaultTest(false, "senior Designer"));
    });
  });

  describe("Рендер переменных заранее введёных в мок внутри компонента", () => {
    it("Рендер изображения пользователя", () => {
      mockWithoutData();
      renderEditProfile();
      expect(screen.getByRole("img", { name: /User/i })).toBeInTheDocument();
    });
    it("Рендер номера телефона пользователя", () => {
      mockWithoutData();
      renderEditProfile();
      expect(screen.getByText("+8801712663389")).toBeInTheDocument();
    });
    it("Рендер даты регистрации", () => defaultTest(false, "28 jan 2021"));
  });
});

// ===== НОВЫЕ ТЕСТЫ ДЛЯ KYC =====
describe("EditProfilePage - KYC логика", () => {
  describe("Состояние: KYC не начат (404)", () => {
    it("показывает кнопку 'Начать верификацию' при отсутствии заявки", () => {
      mockKycStatus(mockedUseGetKycStatusQuery, null, {
        status: HTTP_STATUS.NOT_FOUND,
      });
      renderEditProfile();
      expect(
        screen.getByRole("button", { name: /Начать верификацию/i })
      ).toBeInTheDocument();
    });

    it("при клике на кнопку вызывается startKyc и refetch", async () => {
      const startKyc = mockStartKyc(mockedUseStartKycMutation);
      const refetch = vi.fn();
      mockedUseGetKycStatusQuery.mockReturnValue({
        data: undefined,
        error: { status: HTTP_STATUS.NOT_FOUND },
        refetch,
      } as unknown as ReturnType<typeof mockedUseGetKycStatusQuery>);

      renderEditProfile();
      const button = screen.getByRole("button", { name: /Начать верификацию/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(startKyc).toHaveBeenCalledWith(1);
        expect(refetch).toHaveBeenCalled();
      });
    });

    it("кнопка disabled во время загрузки startKyc", () => {
      mockKycStatus(mockedUseGetKycStatusQuery, null, {
        status: HTTP_STATUS.NOT_FOUND,
      });
      mockStartKyc(mockedUseStartKycMutation, true);
      renderEditProfile();
      const button = screen.getByRole("button", { name: /Загрузка.../i });
      expect(button).toBeDisabled();
    });
  });

  describe("Состояние: PENDING (заявка на рассмотрении)", () => {
    beforeEach(() => {
      mockKycStatus(mockedUseGetKycStatusQuery, KYC_STATUS.PENDING);
    });

    it("показывает Alert с информацией", () => {
      renderEditProfile();
      expect(screen.getByText(/Заявка на рассмотрении/i)).toBeInTheDocument();
    });

    it("показывает поля для загрузки файлов", () => {
      renderEditProfile();
      expect(screen.getByText("Паспорт")).toBeInTheDocument();
      expect(screen.getByText("Счёт за коммунальные услуги")).toBeInTheDocument();
      expect(screen.getByText("Селфи с паспортом")).toBeInTheDocument();
    });

    // ===== ПРОПУЩЕННЫЕ ТЕСТЫ =====
    it("при выборе файла вызывается uploadDocument с правильным типом", async () => {
      const uploadDocument = mockUploadDocument(mockedUseUploadDocumentMutation);
      renderEditProfile();
      const file = new File(["dummy"], "passport.jpg", { type: "image/jpeg" });
      const input = screen
        .getByText("Паспорт")
        .closest("div")
        ?.querySelector("input") as HTMLInputElement;
      if (!input) throw new Error("Input not found");
      fireEvent.change(input, { target: { files: [file] } });
      await waitFor(() => {
        expect(uploadDocument).toHaveBeenCalledWith({
          userId: 1,
          type: "passport",
          file,
        });
      });
    });

    it("поля загрузки disabled во время загрузки файла", () => {
      mockUploadDocument(mockedUseUploadDocumentMutation, true);
      renderEditProfile();
      const inputs = document.querySelectorAll('input[type="file"]');
      inputs.forEach((input) => expect(input).toBeDisabled());
    });

    it("после загрузки файла появляется alert", async () => {
      const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
      const uploadDocument = mockUploadDocument(mockedUseUploadDocumentMutation);
      renderEditProfile();
      const file = new File(["dummy"], "bill.pdf", { type: "application/pdf" });
      const input = screen
        .getByText("Счёт за коммунальные услуги")
        .closest("div")
        ?.querySelector("input") as HTMLInputElement;
      if (!input) throw new Error("Input not found");
      fireEvent.change(input, { target: { files: [file] } });
      await waitFor(() => {
        expect(uploadDocument).toHaveBeenCalled();
        expect(alertMock).toHaveBeenCalledWith("Документ utility_bill успешно загружен");
      });
      alertMock.mockRestore();
    });
  });

  describe("Состояние: APPROVED", () => {
    it("показывает Alert об успешной верификации", () => {
      mockKycStatus(mockedUseGetKycStatusQuery, KYC_STATUS.APPROVED);
      renderEditProfile();
      expect(screen.getByText(/Верификация успешно пройдена!/i)).toBeInTheDocument();
    });
  });

  describe("Состояние: REJECTED", () => {
    it("показывает Alert об отклонении и кнопку 'Повторить'", () => {
      mockKycStatus(mockedUseGetKycStatusQuery, KYC_STATUS.REJECTED);
      renderEditProfile();
      expect(screen.getByText(/Верификация отклонена/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Повторить/i })).toBeInTheDocument();
    });

    it("при клике 'Повторить' вызывается startKyc", async () => {
      const startKyc = mockStartKyc(mockedUseStartKycMutation);
      mockKycStatus(mockedUseGetKycStatusQuery, KYC_STATUS.REJECTED);
      renderEditProfile();
      const retryButton = screen.getByRole("button", { name: /Повторить/i });
      fireEvent.click(retryButton);
      await waitFor(() => {
        expect(startKyc).toHaveBeenCalledWith(1);
      });
    });
  });

  describe("Обработка ошибок KYC", () => {
    it("если загрузка статуса KYC завершилась с другой ошибкой (не 404), ничего не ломается", () => {
      mockKycStatus(mockedUseGetKycStatusQuery, null, {
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      });
      renderEditProfile();
      expect(screen.getByText("editProfile.edit")).toBeInTheDocument(); // Исправил: проверяем наличие кнопки editProfile.edit
    });
  });
});
