// @vitest-environment node

import { configureStore } from "@reduxjs/toolkit";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { transactionApi } from "./transaction.api";
import { TransactionStatus } from "../model/transactionStatus";
import type {
  CreateTransactionRequest,
  TransactionPageResponse,
  TransactionResponse,
} from "../model/transaction.types";
import { baseApi } from "@/shared/api/baseApi";

const TRANSACTIONS_URL = `${import.meta.env.VITE_API_URL}/transaction-service/transactions`;

const transaction: TransactionResponse = {
  id: "transaction-1",
  sourceAccountId: "account-1",
  targetAccountId: "account-2",
  amount: 125,
  currency: "USD",
  status: TransactionStatus.COMPLETED,
  createdAt: "2026-07-30T12:00:00Z",
  description: "Transfer to Ivan",
};

const transactionPage: TransactionPageResponse = {
  content: [transaction],
  page: 0,
  size: 20,
  totalElements: 1,
  totalPages: 1,
  first: true,
  last: true,
  empty: false,
};

const createTestStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

const server = setupServer(
  http.get(TRANSACTIONS_URL, () => HttpResponse.json(transactionPage)),
  http.post(TRANSACTIONS_URL, () => HttpResponse.json(transaction, { status: 201 }))
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("Интеграция управления транзакциями", () => {
  it("загружает список транзакций с фильтрами", async () => {
    server.use(
      http.get(TRANSACTIONS_URL, ({ request }) => {
        const url = new URL(request.url);

        expect(url.searchParams.get("page")).toBe("0");
        expect(url.searchParams.get("size")).toBe("20");
        expect(url.searchParams.get("accountId")).toBe("account-1");
        expect(url.searchParams.get("status")).toBe(TransactionStatus.COMPLETED);

        return HttpResponse.json(transactionPage);
      })
    );

    const store = createTestStore();

    const result = await store
      .dispatch(
        transactionApi.endpoints.getTransactions.initiate({
          page: 0,
          size: 20,
          accountId: "account-1",
          status: TransactionStatus.COMPLETED,
        })
      )
      .unwrap();

    expect(result).toEqual(transactionPage);
  });

  it("создаёт транзакцию и передаёт Idempotency-Key", async () => {
    const body: CreateTransactionRequest = {
      idempotencyKey: "operation-key-1",
      sourceAccountId: "account-1",
      targetAccountId: "account-2",
      amount: 125,
      currency: "USD",
      description: "Transfer to Ivan",
    };

    server.use(
      http.post(TRANSACTIONS_URL, async ({ request }) => {
        expect(request.headers.get("Idempotency-Key")).toBe(body.idempotencyKey);
        expect(request.headers.get("Content-Type")).toContain("application/json");
        await expect(request.json()).resolves.toEqual(body);

        return HttpResponse.json(transaction, { status: 201 });
      })
    );

    const store = createTestStore();

    const result = await store
      .dispatch(transactionApi.endpoints.createTransaction.initiate(body))
      .unwrap();

    expect(result).toEqual(transaction);
  });

  it("возвращает ошибку backend при неудачном создании", async () => {
    server.use(
      http.post(TRANSACTIONS_URL, () =>
        HttpResponse.json({ message: "Insufficient funds" }, { status: 400 })
      )
    );

    const store = createTestStore();

    const result = await store.dispatch(
      transactionApi.endpoints.createTransaction.initiate({
        idempotencyKey: "operation-key-2",
        sourceAccountId: "account-1",
        targetAccountId: "account-2",
        amount: 999_999,
        currency: "USD",
        description: "Too large transfer",
      })
    );

    expect(result).toHaveProperty("error");
    expect("error" in result && result.error).toMatchObject({
      status: 400,
      data: { message: "Insufficient funds" },
    });
  });

  it("повторно загружает список после создания транзакции", async () => {
    const getTransactions = vi.fn(() => HttpResponse.json(transactionPage));

    server.use(
      http.get(TRANSACTIONS_URL, getTransactions),
      http.post(TRANSACTIONS_URL, () => HttpResponse.json(transaction, { status: 201 }))
    );

    const store = createTestStore();
    const subscription = store.dispatch(
      transactionApi.endpoints.getTransactions.initiate({
        page: 0,
        size: 20,
      })
    );

    await subscription.unwrap();
    expect(getTransactions).toHaveBeenCalledTimes(1);

    await store
      .dispatch(
        transactionApi.endpoints.createTransaction.initiate({
          idempotencyKey: "operation-key-3",
          sourceAccountId: "account-1",
          targetAccountId: "account-2",
          amount: 125,
          currency: "USD",
          description: "Transfer to Ivan",
        })
      )
      .unwrap();

    await vi.waitFor(() => {
      expect(getTransactions).toHaveBeenCalledTimes(2);
    });

    subscription.unsubscribe();
  });
});
