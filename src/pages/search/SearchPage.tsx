import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

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
      const filtered = prevHistory.filter((query) => query !== trimmedQuery);
      const newHistory = [trimmedQuery, ...filtered];
      return newHistory.slice(0, 3);
    });
  };

  const filteredTransactions = transactions.filter((tx) =>
    tx.name.toLowerCase().includes(debounceSearch.toLowerCase())
  );

  const filteredHistory = history.filter(
    (item) =>
      item.toLowerCase().includes(searchValue.toLowerCase()) &&
      item.toLowerCase() !== searchValue.trim().toLowerCase()
  );

  const shouldShowDropdown =
    isFocused && (searchValue === "" ? history.length > 0 : filteredHistory.length > 0);

  return (
    <Box className={styles.container}>
      <Box className={styles.searchWrapper}>
        <Box className={styles.searchForm}>
          <img
            src={searchIcon}
            alt="search"
            className={styles.searchIcon}
            onClick={() => {
              handleSaveHistory(searchValue);
              inputRef.current?.blur();
            }}
          />
          <InputBase
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
            inputRef={inputRef}
            fullWidth
            sx={{
              color: "var(--color-text-primary)",
              "& input::placeholder": {
                color: "var(--color-text-secondary)",
                opacity: 1,
              },
              "& input": {
                padding: 0,
              },
            }}
          />
          {searchValue && (
            <img
              src={closeIcon}
              alt="clear"
              className={styles.clearIcon}
              onClick={handleClear}
            />
          )}
        </Box>

        {shouldShowDropdown && (
          <Box className={styles.historyDropdown} onMouseDown={(e) => e.preventDefault()}>
            {(searchValue === "" ? history : filteredHistory).map((item) => (
              <Box
                key={item}
                className={styles.historyItem}
                onMouseDown={() => {
                  setSearchValue(item);
                  inputRef.current?.blur();
                }}
              >
                <span className={styles.historyText}>{item}</span>
                <IconButton
                  size="small"
                  className={styles.deleteItemBtn}
                  onMouseDown={(e) => handleDeleteHistoryItem(item as string, e)}
                >
                  ✕
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box className={styles.transactionsList}>
        {/* Для дальнейшего ревью - в рамках задачи сделан UI поиск, а вот починить иконки и их инверсию можно только в reset.css
        и в TransactionItem, в идеале там нужно разделить будет монохромные и цветные и уже отталкиваясь от типа давать инверсию цвета.
        
        */}
        {filteredTransactions.map((tx) => (
          <Box
            key={tx.id}
            onClick={() => {
              handleSaveHistory(tx.name);
              setSearchValue(tx.name);
              inputRef.current?.blur();
            }}
            sx={{ cursor: "pointer" }}
          >
            <TransactionItem
              icon={tx.icon}
              name={tx.name}
              category={tx.category}
              price={tx.amount}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default SearchPage;
