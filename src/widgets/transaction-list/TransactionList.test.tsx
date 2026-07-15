import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import TransactionList from "./TransactionList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import bankSlice, { initialUser } from "../../app/store/slices/bankSlice";
import { localStorageMiddleware } from "../../app/store/middleware/localStorageMiddleware";
import { baseApi } from "@/entities/user/api/base-api";
import type { UserState } from "@/shared/types/typesReducer";
import apple from "@/shared/icons/apple.svg";
import spotify from "@/shared/icons/spotify.svg";
import moneyTransfer from "@/shared/icons/moneyTransfer.svg";
import { MemoryRouter } from "react-router-dom";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "transaction.empty": "Список транзакций пуст",
      };
      return translations[key] || key;
    },
  }),
}));

const user = localStorage.getItem("bank_user");
const token = localStorage.getItem("bank_token");

const mockList: UserState["transactions"] = [
  {
    id: "1",
    icon: apple,
    name: "Яблоко",
    category: "Развлечение",
    price: "- 600 руб.",
  },
  {
    id: "2",
    icon: spotify,
    name: "Спотифай",
    category: "Музыка",
    price: "- 1200 руб.",
  },
  {
    id: "3",
    icon: moneyTransfer,
    name: "Денежный перевод",
    category: "Переводная операция",
    price: "30000 руб.",
  },
];

const createMockStore = (preloadedItems: UserState["transactions"] = []) =>
  configureStore({
    reducer: {
      bank: bankSlice,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware).concat(baseApi.middleware),
    preloadedState: {
      bank: {
        user: user ? JSON.parse(user) : initialUser,
        token: token || "",
        showPassword: false,
        isAuth: false,
        transactions: preloadedItems,
      },
    },
  });

describe("render transactionList", () => {
  it("empty list, must written Список транзакций пуст", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    );
    screen.debug();
    expect(screen.getByText(/список транзакций пуст/i)).toBeInTheDocument();
  });
  it("try testing list", () => {
    const store = createMockStore(mockList);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TransactionList />
        </MemoryRouter>
      </Provider>
    );

    screen.debug();

    expect(screen.getByText(/яблоко/i)).toBeInTheDocument();
    expect(screen.getByText(/развлечение/i)).toBeInTheDocument();
    expect(screen.getByText(/спотифай/i)).toBeInTheDocument();
    expect(screen.getByText(/музыка/i)).toBeInTheDocument();
    expect(screen.getByText(/денежный перевод/i)).toBeInTheDocument();
    expect(screen.getByText(/переводная операция/i)).toBeInTheDocument();
  });
});
