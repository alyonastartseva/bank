import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import { TransactionHistoryList } from './TransactionHistoryList';

// Мок для TransactionScroll
vi.mock('@/shared/ui/TransactionScroll/TransactionScroll', () => ({
  TransactionScroll: ({ transactions, emptyMessage }: any) => (
    <div data-testid="transaction-scroll">
      <span>Transactions count: {transactions.length}</span>
      {transactions.length === 0 && <span>{emptyMessage}</span>}
    </div>
  ),
}));

describe('TransactionHistoryList', () => {
  const createStore = (transactions: any[]) => {
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

  const mockTransactions = [
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

  it('вызывает кнопку "seeAll" (если она имеет обработчик)', () => {
    // В текущем коде кнопка не имеет onClick, но возможно в будущем добавится.
    // Пока проверим, что кнопка рендерится и клик не вызывает ошибку.
    const store = createStore(mockTransactions);
    render(
      <Provider store={store}>
        <TransactionHistoryList />
      </Provider>
    );
    const button = screen.getByText('transactionHistory.seeAll');
    fireEvent.click(button);
    // Если нет обработчика, ничего не произойдёт, тест пройдёт.
    expect(button).toBeInTheDocument();
  });
});