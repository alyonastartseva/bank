import type { Transaction } from '@/shared/types/typesReducer';

export const appleTransaction: Transaction = {
  id: '1',
  icon: 'apple.svg',
  name: 'Apple',
  category: 'Entertainment',
  price: '- $5.99',
};

export const spotifyTransaction: Transaction = {
  id: '2',
  icon: 'spotify.svg',
  name: 'Spotify',
  category: 'Music',
  price: '- $12.99',
};

export const moneyTransferTransaction: Transaction = {
  id: '3',
  icon: 'transfer.svg',
  name: 'Money Transfer',
  category: 'Transaction',
  price: '+ $300.00',
};

export const groceryTransaction: Transaction = {
  id: '3',
  icon: 'cart.svg',
  name: 'Grocery',
  category: 'Shop',
  price: '- $88.00',
};

export const twoTransactions: Transaction[] = [
  appleTransaction,
  spotifyTransaction,
];

export const threeTransactions: Transaction[] = [
  appleTransaction,
  spotifyTransaction,
  moneyTransferTransaction,
];

export const fourTransactions: Transaction[] = [
  appleTransaction,
  spotifyTransaction,
  groceryTransaction,
  { ...moneyTransferTransaction, id: '4', name: 'Transfer', icon: 'transfer.svg' },
];

export const defaultTransactionProps = {
  icon: 'test-icon.svg',
  name: 'Apple Store',
  category: 'Shopping',
  price: '- $99.99',
};
