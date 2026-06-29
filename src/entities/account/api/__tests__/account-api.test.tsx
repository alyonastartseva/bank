import { configureStore } from "@reduxjs/toolkit";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Account, CreateAccountRequest, BalanceResponse } from "../../model/types";

const testBaseAccountApi = createApi({
  reducerPath: "testAccountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/account-service/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("X-User-Id", "1");
      headers.set("X-User-Type", "USER");
      headers.set("X-Service-Name", "account-service");
      return headers;
    },
  }),
  tagTypes: ["Account", "Balance"],
  endpoints: () => ({}),
});

const testAccountApi = testBaseAccountApi.injectEndpoints({
  endpoints: (build) => ({
    getAccountById: build.query<Account, string>({
      query: (id) => `/accounts/${id}`,
    }),
    getBalance: build.query<BalanceResponse, string>({
      query: (id) => `/accounts/${id}/balance`,
    }),
    createAccount: build.mutation<Account, CreateAccountRequest>({
      query: (body) => ({
        url: "/accounts",
        method: "POST",
        body,
      }),
    }),
    blockAccount: build.mutation<Account, { id: string }>({
      query: ({ id }) => ({
        url: `/accounts/${id}/block`,
        method: "POST",
      }),
    }),
  }),
});

const mockAccount: Account = {
  id: "acc-1",
  accountId: 1,
  externalId: "550e8400-e29b-41d4-a716-446655440000",
  accountNumber: "1234567890",
  userId: 1,
  initialBalance: 1000,
  balance: 1000,
  currency: "RUB",
  status: "active",
  createdAt: "2026-01-01T00:00:00Z",
};

const mockBalance: BalanceResponse = {
  accountId: "550e8400-e29b-41d4-a716-446655440000",
  amount: 1000,
  currency: "RUB",
  lastUpdated: "2026-01-01T00:00:00Z",
};

const createTestStore = () =>
  configureStore({
    reducer: {
      [testBaseAccountApi.reducerPath]: testBaseAccountApi.reducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(testBaseAccountApi.middleware),
  });

const server = setupServer(
  http.post("http://localhost/account-service/api/accounts", async ({ request }) => {
    const body = await request.json() as CreateAccountRequest;
    if (body.userId === "1") {
      return HttpResponse.json(mockAccount, { status: 201 });
    }
    return HttpResponse.json({ message: "User not found" }, { status: 404 });
  }),
  http.get("http://localhost/account-service/api/accounts/:id/balance", ({ params }) => {
    const { id } = params;
    if (id === "550e8400-e29b-41d4-a716-446655440000") {
      return HttpResponse.json(mockBalance);
    }
    return HttpResponse.json({ message: "Account not found" }, { status: 404 });
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("accountApi integration tests", () => {
  it("успешно создаёт счёт", async () => {
    const store = createTestStore();
    const request: CreateAccountRequest = {
      userId: "1",
      initialBalance: 1000,
      currency: "RUB",
      accountType: "CHECKING",
    };

    const result = await store
      .dispatch(testAccountApi.endpoints.createAccount.initiate(request))
      .unwrap();

    expect(result).toEqual(mockAccount);
  });

  it("возвращает ошибку при создании счёта для несуществующего пользователя", async () => {
    const store = createTestStore();
    const request: CreateAccountRequest = {
      userId: "999",
      initialBalance: 1000,
      currency: "RUB",
      accountType: "CHECKING",
    };

    const result = await store.dispatch(
      testAccountApi.endpoints.createAccount.initiate(request)
    );

    expect(result).toHaveProperty("error");
    expect("error" in result && result.error).toMatchObject({
      status: 404,
      data: { message: "User not found" },
    });
  });

  it("успешно получает баланс", async () => {
    const store = createTestStore();
    const accountId = "550e8400-e29b-41d4-a716-446655440000";

    const result = await store
      .dispatch(testAccountApi.endpoints.getBalance.initiate(accountId))
      .unwrap();

    expect(result).toEqual(mockBalance);
  });

  it("возвращает ошибку при запросе баланса несуществующего счёта", async () => {
    const store = createTestStore();
    const accountId = "non-existent-id";

    const result = await store.dispatch(
      testAccountApi.endpoints.getBalance.initiate(accountId)
    );

    expect(result).toHaveProperty("error");
    expect("error" in result && result.error).toMatchObject({
      status: 404,
      data: { message: "Account not found" },
    });
  });
});