import { render, screen } from '@testing-library/react';
import { TransactionScroll } from './TransactionScroll';

// Мокаем VirtualScroll
vi.mock('@/shared/ui/VirtualScroll/VirtualScroll', () => ({
  VirtualScroll: ({ data, renderItem, heightOfItem, heightOfContainer, marginBottom }: any) => (
    <div data-testid="virtual-scroll">
      <div>heightOfItem: {heightOfItem}</div>
      <div>heightOfContainer: {heightOfContainer}</div>
      <div>marginBottom: {marginBottom}</div>
      {data.map((item: any) => renderItem(item))}
    </div>
  ),
}));

// Мокаем TransactionItem
vi.mock('@/shared/ui/transactionItem/TransactionItem', () => ({
  default: ({ name, price }: any) => (
    <div data-testid="transaction-item">
      <span>{name}</span>
      <span>{price}</span>
    </div>
  ),
}));

describe('TransactionScroll', () => {
  const mockTransactions = [
    { id: '1', icon: 'apple.svg', name: 'Apple', category: 'Entertainment', price: '- $5.99' },
    { id: '2', icon: 'spotify.svg', name: 'Spotify', category: 'Music', price: '- $12.99' },
  ];

  it('отображает пустое сообщение, когда транзакций нет', () => {
    render(<TransactionScroll transactions={[]} emptyMessage="Нет данных" />);
    expect(screen.getByText('Нет данных')).toBeInTheDocument();
  });

  it('рендерит VirtualScroll с переданными транзакциями', () => {
    render(<TransactionScroll transactions={mockTransactions} />);
    expect(screen.getByTestId('virtual-scroll')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
  });

  it('передаёт корректные параметры в VirtualScroll', () => {
    render(<TransactionScroll transactions={mockTransactions} />);
    expect(screen.getByText('heightOfItem: 42')).toBeInTheDocument();
    expect(screen.getByText('heightOfContainer: 400')).toBeInTheDocument();
    expect(screen.getByText('marginBottom: 22')).toBeInTheDocument();
  });

  it('не отображает пустое сообщение, когда транзакции есть', () => {
    render(<TransactionScroll transactions={mockTransactions} emptyMessage="Нет данных" />);
    expect(screen.queryByText('Нет данных')).not.toBeInTheDocument();
    expect(screen.getByTestId('virtual-scroll')).toBeInTheDocument();
  });
});