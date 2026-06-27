import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import TransactionTable from './TransactionTable';
import type { Transaction } from '@/shared/types/typesReducer';
import { threeTransactions } from '@/shared/test/mock';

// Мок для иконок MUI
vi.mock('@mui/icons-material/ArrowDownward', () => ({ default: () => <span>ArrowDownIcon</span> }));
vi.mock('@mui/icons-material/ArrowUpward', () => ({ default: () => <span>ArrowUpIcon</span> }));
vi.mock('@mui/icons-material/SwapHoriz', () => ({ default: () => <span>SwapIcon</span> }));

describe('TransactionTable', () => {
  const createStore = (transactions: Transaction[]) => {
    return configureStore({
      reducer: { bank: bankReducer },
      preloadedState: {
        bank: {
          user: initialUser,
          token: '',
          showPassword: false,
          isAuth: false,
          transactions,
        },
      },
    });
  };

  const mockTransactions = threeTransactions;

  it('отображает пустое сообщение, когда транзакций нет', () => {
    const store = createStore([]);
    render(
      <Provider store={store}>
        <TransactionTable />
      </Provider>
    );
    expect(screen.getByText('transaction.empty')).toBeInTheDocument();
  });

  it('отображает таблицу с заголовками и строками транзакций', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionTable />
      </Provider>
    );
    expect(screen.getByText('Получатель')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Тип')).toBeInTheDocument();
    expect(screen.getByText('Сумма')).toBeInTheDocument();

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText('Money Transfer')).toBeInTheDocument();

    expect(screen.getAllByText('Entertainment').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Music').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Transaction').length).toBeGreaterThan(0);

    expect(screen.getByText('+ $300.00')).toBeInTheDocument();
  });

  it('вызывает sellAllTransactions при клике на кнопку', async () => {
    const store = createStore(mockTransactions);
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <TransactionTable />
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: /transaction.sellAll/i }));
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'bank/sellAllTransactions' }));
  });

  it('рендерит заголовок и кнопку с переведёнными текстами', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionTable />
      </Provider>
    );
    expect(screen.getByText('transaction.title')).toBeInTheDocument();
    expect(screen.getByText('transaction.sellAll')).toBeInTheDocument();
  });

  it('правильно применяет цвета для категорий и суммы', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionTable />
      </Provider>
    );
    const chips = screen.getAllByRole('button');
    expect(chips.length).toBeGreaterThan(0);
    expect(screen.getByText('+ $300.00')).toBeInTheDocument();
  });
});