import { render, screen } from '@testing-library/react';
import TransactionItem from './TransactionItem';
import style from './TransactionItem.module.css';
import { defaultTransactionProps } from '@/shared/test/mock';

describe('TransactionItem', () => {
  const defaultProps = defaultTransactionProps;

  it('рендерит компонент с корректными данными', () => {
    render(<TransactionItem {...defaultProps} />);
    expect(screen.getByAltText('icon')).toHaveAttribute('src', 'test-icon.svg');
    expect(screen.getByText('Apple Store')).toBeInTheDocument();
    expect(screen.getByText('Shopping')).toBeInTheDocument();
    expect(screen.getByText('- $99.99')).toBeInTheDocument();
  });

  it('для отрицательной цены не применяет класс plusPrice', () => {
    render(<TransactionItem {...defaultProps} />);
    const priceElement = screen.getByText('- $99.99');
    expect(priceElement).not.toHaveClass(style.plusPrice);
  });

  it('для положительной цены применяет класс plusPrice', () => {
    const positiveProps = { ...defaultProps, price: '+ $50.00' };
    render(<TransactionItem {...positiveProps} />);
    const priceElement = screen.getByText('+ $50.00');
    expect(priceElement).toHaveClass(style.plusPrice);
  });
});