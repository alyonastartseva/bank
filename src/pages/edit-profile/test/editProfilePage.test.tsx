import {beforeEach, describe, expect, it, vi} from "vitest";
import {screen} from "@testing-library/react";
import {useGetUserQuery} from '@/entities/user/api/user-api.ts'
import {renderWithProviders} from "@/shared/test/renderWithProviders.tsx";
import EditProfilePage from "@/pages/edit-profile/ui/EditProfilePage.tsx";

//=====Зона создания мока======

//Мокаем useGetUserQuery
vi.mock('@/entities/user/api/user-api.ts', () => ({
    useGetUserQuery: vi.fn()
}))

//Указываем для TS что useGetUserQuery теперь является моком
const mockedUseGetUserQuery = vi.mocked(useGetUserQuery)

//Очищаем данные моков, чтобы они не просачивались в другие тесты
beforeEach(() => {
    vi.clearAllMocks();
})

//=============================

//====Заготовка конкретных моков под большую часть тестов====

//Мок в случае, если данные не получены, но загрузка завершена
const mockWithoutData = function () {
    return mockedUseGetUserQuery.mockReturnValue({
        data: {
            user: undefined,
            isLoading: false,
        },

    } as any)
}

//Мок в случае, если данные получены и загрузка завершена
const mockWithData = function () {
    return mockedUseGetUserQuery.mockReturnValue({
        data: {
            fullName: 'Ivanov',
            role: 'Senior Frontend',
            email: 'charge@gmail.com'
        },
        isLoading: false,
    } as any)
}

//===========================================================

//Заранее указываем, что мы будем рендерить EditProfilePage, поскольку тесты пишутся только для него
const renderEditProfile = function () {
    return renderWithProviders(<EditProfilePage/>)
}

//Функция, которая упрощает написание базовых тестов по проверке на наличие текста
const defaultTest = function (isData: boolean, textToCheck: string ) {
    if (isData) {
        mockWithData()
    } else {
        mockWithoutData()
    }
    renderEditProfile()
    expect(screen.getByText(new RegExp(textToCheck, 'i')))
        .toBeInTheDocument()
}

describe('editProfilePageTests', () => {
    it('Если "isLoading = true", то на странице есть только CircularProgress', () => {
        mockedUseGetUserQuery.mockReturnValue({
            data: undefined,
            isLoading: true,
        } as any)
        renderEditProfile()
        const loader = screen.getByRole('progressbar')
        expect(loader).toBeInTheDocument()
    })
    describe('Рендер полей заголовков', () => {
        it('Рендер Edit Profile', () => {
            mockWithoutData()
            renderEditProfile()
            const editProfile = screen.getByRole('heading', {
                name: /edit profile/i,
            })
            expect(editProfile).toBeInTheDocument()
        })
        it('Рендер Full Name', () => {
            defaultTest(false, 'Full Name')
        })
        it('Рендер Email Address', () => {
            defaultTest(false, 'Email Address')
        })
        it('Рендер Phone Number', () => {
            defaultTest(false, 'Phone Number')
        })
        it('рендер Birth Date', () => {
            defaultTest(false, 'Birth Date')
        })
    })
    describe('Рендер статических данных, независимых от сервера', () => {
        it('Рендер даты дня рождения', () => {
            mockWithoutData()
            renderEditProfile()
            const date = screen.getByText('28');
            const month = screen.getByText(/september/i)
            const year = screen.getByText('2000')
            expect(date).toBeInTheDocument()
            expect(month).toBeInTheDocument()
            expect(year).toBeInTheDocument()
        })
    })
    describe('Рендер переменных, которые получают данные от сервера', () => {
        describe('Рендер переменных при наличии данных от сервера', () => {
            it('Переменная fullName корректно отображается', () => {
                mockWithData()
                renderEditProfile()
                const fullName = screen.getByRole('heading', {
                    name: /Ivanov/i
                })
                expect(fullName).toBeInTheDocument()
            })
            it('Переменная email корректно отображается', () => {
                defaultTest(true, 'charge@gmail.com')
            })
            it('Переменная role корректно отображается', () => {
                defaultTest(true, 'Senior Frontend')
            })
        })
        describe('Рендер переменных при отсутствии данных от сервера', () => {
            it('Альт картинки = User', () => {
                mockWithoutData()
                renderEditProfile()
                const userAvatar = screen.getByAltText(/User/i)
                expect(userAvatar).toBeInTheDocument()
            })
            it('Роль юзера = Senior Design', () => {
                defaultTest(false, 'senior Designer')
            })
        })
    })
    describe('Рендер переменных заранее введёных в мок внутри компонента', () => {
        it('Рендер изображения пользователя', () => {
            mockWithoutData()
            renderEditProfile()
            const image = screen.getByRole('img', {
                name: /User/i
            })
            expect(image).toBeInTheDocument()
        })
        it('Рендер номера телефона пользователя', () => {
            mockWithoutData()
            renderEditProfile()
            const phoneNumber = screen.getByText('+8801712663389')
            expect(phoneNumber).toBeInTheDocument()
        })
        it('Рендер даты регистрации', () => {
            defaultTest(false, '28 jan 2021')
        })
    })
})

