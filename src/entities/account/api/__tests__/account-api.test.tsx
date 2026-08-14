import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { accountApi } from "../account-api";
import { baseAccountApi } from "../base-account-api";

const { createApi, fetchBaseQuery } = await vi.hoisted(
  async () => await import("@reduxjs/toolkit/query/react")
);

vi.mock("../base-account-api", () => {
  return {
    baseAccountApi: createApi({
      reducerPath: "accountApi",
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
    }),
  };
});

const createTestStore = () =>
  configureStore({
    reducer: {
      [baseAccountApi.reducerPath]: baseAccountApi.reducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(baseAccountApi.middleware),
  });

describe("accountApi endpoints", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
        text: () => Promise.resolve(""),
        clone: () => ({ json: () => Promise.resolve({}) }),
        headers: new Headers(),
        status: 200,
        statusText: "OK",
      } as Response)
    );
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("createAccount делает POST /accounts с правильным телом", async () => {
    const store = createTestStore();
    const body = {
      userId: "1",
      initialBalance: 1000,
      currency: "RUB" as const,
      accountType: "CHECKING" as const,
    };

    await store.dispatch(accountApi.endpoints.createAccount.initiate(body));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0];
    const request = call[0];
    const options = call[1] || {};

    const method = request instanceof Request ? request.method : options.method;

    expect(request instanceof Request ? request.url : request).toBe("http://localhost/account-service/api/accounts");
    expect(method).toBe("POST");

    if (request instanceof Request) {
      expect(body).toEqual(body);
    } else {
      expect(JSON.parse(options.body as string)).toEqual(body);
    }
  });

  it("getBalance делает GET /accounts/:id/balance", async () => {
    const store = createTestStore();
    const accountId = "550e8400-e29b-41d4-a716-446655440000";
    await store.dispatch(accountApi.endpoints.getBalance.initiate(accountId));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0];
    const request = call[0];
    const options = call[1] || {};

    const url = request instanceof Request ? request.url : request;
    const method = request instanceof Request ? request.method : options.method;

    expect(url).toBe(`http://localhost/account-service/api/accounts/${accountId}/balance`);
    expect(method).toBe("GET");
  });

  it("getAccountById делает GET /accounts/:id", async () => {
    const store = createTestStore();
    const accountId = "acc-123";
    await store.dispatch(accountApi.endpoints.getAccountById.initiate(accountId));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0];
    const request = call[0];
    const options = call[1] || {};

    const url = request instanceof Request ? request.url : request;
    const method = request instanceof Request ? request.method : options.method;

    expect(url).toBe(`http://localhost/account-service/api/accounts/${accountId}`);
    expect(method).toBe("GET");
  });

  it("blockAccount делает POST /accounts/:id/block", async () => {
    const store = createTestStore();
    const id = "acc-456";
    await store.dispatch(accountApi.endpoints.blockAccount.initiate({ id }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0];
    const request = call[0];
    const options = call[1] || {};

    const url = request instanceof Request ? request.url : request;
    const method = request instanceof Request ? request.method : options.method;

    expect(url).toBe(`http://localhost/account-service/api/accounts/${id}/block`);
    expect(method).toBe("POST");
  });
});