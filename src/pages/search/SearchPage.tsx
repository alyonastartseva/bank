import { useState } from 'react';
import styles from './SearchPage.module.css';
import searchIcon from '@/shared/icons/loupe_grey.svg';  
import closeIcon from '@/shared/icons/close_grey.svg';    

import appleIcon from '@/shared/icons/apple.svg';
import spotifyIcon from '@/shared/icons/spotify.svg';
import moneyTransferIcon from '@/shared/icons/moneyTransfer.svg';
import cartIcon from '@/shared/icons/cart.svg';


const transactions = [
  { id: 1, name: 'Apple Store"', category: 'Entertainment', amount: '- $5,99', icon: appleIcon },
  { id: 2, name: 'Spotify', category: 'Music', amount: '- $12,99', icon: spotifyIcon },
  { id: 3, name: 'Money Transfer', category: 'Transaction', amount: '$300', icon: moneyTransferIcon },
  { id: 4, name: 'Grocery', category: 'Shopping', amount: '- $ 88', icon: cartIcon },
  { id: 5, name: 'Apple Store', category: 'Entertainment', amount: '- $5,99', icon: appleIcon },
  { id: 6, name: 'Money Transfer', category: 'Transaction', amount: '$300', icon: moneyTransferIcon },
  { id: 7, name: 'Apple Store', category: 'Entertainment', amount: '- $5,99', icon: appleIcon },
  { id: 8, name: 'Spotify', category: 'Music', amount: '- $12,99', icon: spotifyIcon },
];

export function SearchPage() {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchForm}>
        <img src={searchIcon} alt="search" className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchInput}
        />
        {searchValue && (
          <img
            src={closeIcon}
            alt="clear"
            className={styles.clearIcon}
            onClick={handleClear}
          />
        )}
      </div>

      <div className={styles.transactionsList}>
        {transactions.map((tx) => (
          <div key={tx.id} className={styles.transactionItem}>
            <div className={styles.iconWrapper}>
              <img src={tx.icon} alt={tx.name} className={styles.transactionIcon} />
            </div>
            <div className={styles.transactionInfo}>
              <div className={styles.transactionName}>{tx.name}</div>
              <div className={styles.transactionCategory}>{tx.category}</div>
            </div>
            <div className={styles.transactionAmount}>{tx.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );  
}
export default SearchPage;