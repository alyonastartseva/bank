import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import { RecentTransactions } from './RecentTransactions';
import type { Transaction } from '@/shared/types/typesReducer';
import { fourTransactions } from '@/shared/test/mock';

// Мокаем TransactionItem с корректными типами
vi.mock('@/shared/ui/transactionItem/TransactionItem', () => ({
  default: ({ name, price }: { name: string; price: string }) => (
    <div data-testid="transaction-item">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  ),
}));

describe('RecentTransactions', () => {
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

  const mockTransactions = fourTransactions;

  it('отображает пустое сообщение, когда транзакций нет', () => {
    const store = createStore([]);
    render(
      <Provider store={store}>
        <RecentTransactions />
      </Provider>
    );
    expect(screen.getByText('transaction.empty')).toBeInTheDocument();
  });

  it('отображает не более limit транзакций (по умолчанию 3)', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <RecentTransactions />
      </Provider>
    );
    const items = screen.getAllByTestId('transaction-item');
    expect(items).toHaveLength(3);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText('Grocery')).toBeInTheDocument();
    expect(screen.queryByText('Transfer')).not.toBeInTheDocument();
  });

  it('учитывает переданный параметр limit', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <RecentTransactions limit={2} />
      </Provider>
    );
    const items = screen.getAllByTestId('transaction-item');
    expect(items).toHaveLength(2);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.queryByText('Grocery')).not.toBeInTheDocument();
  });

  it('рендерит TransactionItem для каждой транзакции с корректными пропсами', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <RecentTransactions limit={1} />
      </Provider>
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('- $5.99')).toBeInTheDocument();
  });
});