import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import { TransactionHistoryList } from './TransactionHistoryList';
import type { Transaction } from '@/shared/types/typesReducer';
import { twoTransactions } from '@/shared/test/mock';

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

  const mockTransactions = twoTransactions;

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