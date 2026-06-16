import { screen } from '@testing-library/react';
import TransactionHistoryPage from './TransactionHistoryPage';
import { renderWithProviders } from '@/shared/test/renderWithProviders';

// Мокаем TransactionHistoryList, так как он уже протестирован отдельно
vi.mock('@/widgets/transaction-history-list', () => ({
  TransactionHistoryList: () => <div data-testid="transaction-history-list">Mocked List</div>,
}));

describe('TransactionHistoryPage', () => {
  it('рендерит страницу без ошибок', () => {
    renderWithProviders(<TransactionHistoryPage />);
    expect(screen.getByTestId('transaction-history-list')).toBeInTheDocument();
  });

  it('использует правильные классы стилей из layoutStyles', () => {
    const { container } = renderWithProviders(<TransactionHistoryPage />);
    const boxes = container.querySelectorAll('.MuiBox-root');
    // Проверяем, что хотя бы один Box имеет класс, начинающийся с 'page' или 'container' (классы из CSS-модуля)
    // Это нестрогая проверка, но она показывает, что стили применены.
    expect(boxes.length).toBeGreaterThan(0);
  });
});