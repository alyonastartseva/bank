import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bankReducer, { initialUser } from '@/app/store/slices/bankSlice';
import TransactionList from './TransactionList';

// Мокаем VirtualScroll
vi.mock('@/shared/ui/VirtualScroll/VirtualScroll', () => ({
  VirtualScroll: ({ data, renderItem }: any) => (
    <div data-testid="virtual-scroll">
      {data.map((item: any) => renderItem(item))}
    </div>
  ),
}));

// Фабрика для создания store с заданными транзакциями
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

describe('TransactionList', () => {
  const mockTransactions = [
    {
      id: '1',
      icon: 'apple.svg',
      name: 'Apple',
      category: 'Entertainment',
      price: '- $5.99',
    },
    {
      id: '2',
      icon: 'spotify.svg',
      name: 'Spotify',
      category: 'Music',
      price: '- $12.99',
    },
  ];

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

  it('вызывает sellAllTransactions при клике на кнопку', () => {
    const store = createStore(mockTransactions);
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <TransactionList />
      </Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: /transaction.sellAll/i }));
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