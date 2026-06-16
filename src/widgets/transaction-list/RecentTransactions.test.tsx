import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import { RecentTransactions } from './RecentTransactions';

// Мокаем TransactionItem, так как он уже протестирован отдельно
vi.mock('@/shared/ui/transactionItem/TransactionItem', () => ({
  default: ({ name, price }: any) => (
    <div data-testid="transaction-item">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  ),
}));

describe('RecentTransactions', () => {
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
    { id: '3', icon: 'cart.svg', name: 'Grocery', category: 'Shop', price: '- $88.00' },
    { id: '4', icon: 'transfer.svg', name: 'Transfer', category: 'Transaction', price: '+ $300.00' },
  ];

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
    expect(screen.queryByText('Transfer')).not.toBeInTheDocument(); // четвёртая транзакция не должна отображаться
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