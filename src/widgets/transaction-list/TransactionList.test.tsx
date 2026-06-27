import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import TransactionList from './TransactionList';
import type { Transaction } from '@/shared/types/typesReducer';
import { twoTransactions } from '@/shared/test/mock';

// Мокаем VirtualScroll с корректными типами
vi.mock('@/shared/ui/VirtualScroll/VirtualScroll', () => ({
  VirtualScroll: ({ data, renderItem }: { data: Transaction[]; renderItem: (item: Transaction) => React.ReactElement }) => (
    <div data-testid="virtual-scroll">
      {data.map((item) => renderItem(item))}
    </div>
  ),
}));

// Фабрика для создания store с заданными транзакциями
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

describe('TransactionList', () => {
  const mockTransactions = twoTransactions;

  it('отображает пустое сообщение, когда транзакций нет', () => {
    const store = createStore([]);
    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    );
    expect(screen.getByText('transaction.empty')).toBeInTheDocument();
  });

  it('отображает список транзакций с помощью VirtualScroll', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    );
    expect(screen.getByTestId('virtual-scroll')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
  });

  it('вызывает sellAllTransactions при клике на кнопку', async () => {
    const store = createStore(mockTransactions);
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    );
    await userEvent.click(screen.getByRole('button', { name: /transaction.sellAll/i }));
    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'bank/sellAllTransactions' }));
  });

  it('рендерит заголовок и кнопку с переведёнными текстами', () => {
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    );
    expect(screen.getByText('transaction.title')).toBeInTheDocument();
    expect(screen.getByText('transaction.sellAll')).toBeInTheDocument();
  });
});