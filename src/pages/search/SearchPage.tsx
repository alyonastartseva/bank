import { useState, useRef } from "react";
import styles from "./SearchPage.module.css";
import searchIcon from "@/shared/icons/loupe_grey.svg";
import closeIcon from "@/shared/icons/close_grey.svg";
import { transactions } from "@/entities/transaction";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem";
import { useDebounce } from "@/shared/hooks/useDebounce";

export function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceSearch = useDebounce(searchValue, 300);

  const handleClear = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  const handleDeleteHistoryItem = (itemToDelete: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedHistory = history.filter((item) => item !== itemToDelete);
    setHistory(updatedHistory);

    if (updatedHistory.length === 0) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleSaveHistory = (value: string) => {
    const trimmedQuery = value.trim();
    if (!trimmedQuery) return;

    setHistory((prevHistory) => {
      const filtred = prevHistory.filter((query) => query !== trimmedQuery);
      const newHistory = [trimmedQuery, ...filtred];
      return newHistory.slice(0, 3);
    });
  };
  const filtredTransactions = transactions.filter((tx) =>
    tx.name.toLowerCase().includes(debounceSearch.toLowerCase())
  );

  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  );
  const shouldShowDropdown =
    isFocused && (searchValue === "" ? history.length > 0 : filteredHistory.length > 0);
  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchForm}>
          <img
            src={searchIcon}
            alt="search"
            className={styles.searchIcon}
            onClick={() => {
              handleSaveHistory(searchValue);
              inputRef.current?.blur();
            }}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveHistory(searchValue);
                inputRef.current?.blur();
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={inputRef}
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

        {shouldShowDropdown && (
          <div className={styles.historyDropdown} onMouseDown={(e) => e.preventDefault()}>
            {(searchValue === "" ? history : filteredHistory).map((item) => (
              <div
                key={item}
                className={styles.historyItem}
                onMouseDown={() => {
                  setSearchValue(item);
                  inputRef.current?.blur();
                }}
              >
                <span className={styles.historyText}>{item}</span>
                <button
                  type="button"
                  className={styles.deleteItemBtn}
                  onMouseDown={(e) => {
                    handleDeleteHistoryItem(item, e);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.transactionsList}>
        {filtredTransactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            icon={tx.icon}
            name={tx.name}
            category={tx.category}
            price={tx.amount}
          />
        ))}
      </div>
    </div>
  );
}
export default SearchPage;
