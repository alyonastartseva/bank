import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import { TransactionHistoryList } from './TransactionHistoryList';
import type { Transaction } from '@/shared/types/typesReducer';

// Мок для TransactionScroll с корректными типами
vi.mock('@/shared/ui/TransactionScroll/TransactionScroll', () => ({
  TransactionScroll: ({ transactions, emptyMessage }: { transactions: Transaction[]; emptyMessage?: string }) => (
    <div data-testid="transaction-scroll">
      <span>Transactions count: {transactions.length}</span>
      {transactions.length === 0 && <span>{emptyMessage}</span>}
    </div>
  ),
}));

describe('TransactionHistoryList', () => {
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

  const mockTransactions: Transaction[] = [
    { id: '1', icon: 'apple.svg', name: 'Apple', category: 'Entertainment', price: '- $5.99' },
    { id: '2', icon: 'spotify.svg', name: 'Spotify', category: 'Music', price: '- $12.99' },
  ];

  it('отображает заголовок и кнопку с переведёнными текстами', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionHistoryList />
      </Provider>
    );
    expect(screen.getByText('transactionHistory.today')).toBeInTheDocument();
    expect(screen.getByText('transactionHistory.seeAll')).toBeInTheDocument();
  });

  it('передаёт транзакции в TransactionScroll', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionHistoryList />
      </Provider>
    );
    const scrollDiv = screen.getByTestId('transaction-scroll');
    expect(scrollDiv).toHaveTextContent('Transactions count: 2');
  });

  it('передаёт пустое сообщение в TransactionScroll, когда транзакций нет', () => {
    const store = createStore([]);
    render(
      <Provider store={store}>
        <TransactionHistoryList />
      </Provider>
    );
    expect(screen.getByText('transaction.empty')).toBeInTheDocument();
  });
});