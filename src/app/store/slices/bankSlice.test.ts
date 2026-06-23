import { describe, it, expect } from 'vitest';
import reducer, {
  addUser,
  addToken,
  clearUserData,
  changeShowPassword,
  changeAuthStatus,
  sellAllTransactions,
  initialUser,
} from './bankSlice';

describe('bankSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state.user).toEqual(initialUser);
    expect(state.token).toBe('');
    expect(state.showPassword).toBe(false);
    expect(state.isAuth).toBe(false);
    expect(Array.isArray(state.transactions)).toBe(true);
  });

  it('addUser обновляет пользователя', () => {
    const newUser = { fullName: 'Test', email: 't@t.com', password: '123', phoneNumber: '123' };
    const state = reducer(undefined, addUser(newUser));
    expect(state.user).toEqual(newUser);
  });

  it('addToken обновляет токен', () => {
    const state = reducer(undefined, addToken('abc123'));
    expect(state.token).toBe('abc123');
  });

  it('clearUserData сбрасывает данные пользователя и токен', () => {
    const initialState = {
      user: { fullName: 'Test', email: 't@t.com', password: '123', phoneNumber: '123' },
      token: 'abc123',
      showPassword: true,
      isAuth: true,
      transactions: [],
    };
    const state = reducer(initialState, clearUserData());
    expect(state.user).toEqual(initialUser);
    expect(state.token).toBe('');
    expect(state.showPassword).toBe(true);
    expect(state.isAuth).toBe(true);
  });

  it('changeShowPassword переключает showPassword', () => {
    let state = reducer(undefined, changeShowPassword());
    expect(state.showPassword).toBe(true);
    state = reducer(state, changeShowPassword());
    expect(state.showPassword).toBe(false);
  });

  it('changeAuthStatus переключает isAuth', () => {
    let state = reducer(undefined, changeAuthStatus());
    expect(state.isAuth).toBe(true);
    state = reducer(state, changeAuthStatus());
    expect(state.isAuth).toBe(false);
  });

  it('sellAllTransactions очищает транзакции', () => {
    const state = reducer(undefined, sellAllTransactions());
    expect(state.transactions).toEqual([]);
  });
});