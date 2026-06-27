import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Chip,
  Typography,
  Button,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooksReducer';
import { sellAllTransactions } from "@/app/store/slices/bankSlice.ts";
import { useTranslation } from "react-i18next";
import classes from './TransactionTable.module.css';

const getTransactionType = (name: string, price: string) => {
  if (name === 'Money Transfer') {
    return { type: 'Transfer', icon: <SwapHorizIcon fontSize="small" /> };
  }
  if (price.startsWith('-')) {
    return { type: 'Payment', icon: <ArrowDownwardIcon fontSize="small" /> };
  }
  return { type: 'Income', icon: <ArrowUpwardIcon fontSize="small" /> };
};

const getCategoryColors = (category: string) => {
  switch (category) {
    case 'Entertainment':
      return { bg: 'var(--color-entertainment-bg)', text: 'var(--color-entertainment-text)' };
    case 'Music':
      return { bg: 'var(--color-music-bg)', text: 'var(--color-music-text)' };
    case 'Transaction':
      return { bg: 'var(--color-transaction-bg)', text: 'var(--color-transaction-text)' };
    case 'Shop':
      return { bg: 'var(--color-shop-bg)', text: 'var(--color-shop-text)' };
    default:
      return { bg: 'var(--color-default-bg)', text: 'var(--color-default-text)' };
  }
};

const TransactionTable = () => {
  const transactions = useAppSelector((state) => state.bank.transactions);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Paper className={classes.root}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
        <Typography variant="h6" className={classes.title}>
          {t("transaction.title")}
        </Typography>
        <Button variant="outlined" onClick={() => dispatch(sellAllTransactions())}>
          {t("transaction.sellAll")}
        </Button>
      </Box>

      {!transactions.length && <Box className={classes.emptyState}>
        <Typography color="textSecondary">{t("transaction.empty")}</Typography>
      </Box>}

      {!!transactions.length && <Table className={classes.table}>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell className={classes.headerCell}>Получатель</TableCell>
            <TableCell className={classes.headerCell}>Категория</TableCell>
            <TableCell className={classes.headerCell}>Тип</TableCell>
            <TableCell align="right" className={classes.headerCell}>Сумма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => {
            const { type, icon } = getTransactionType(tx.name, tx.price);
            const isNegative = tx.price.startsWith('-');
            const { bg, text } = getCategoryColors(tx.category);

            return (
              <TableRow key={tx.id} hover className={classes.lastRowBorderless}>
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <img src={tx.icon} alt={tx.name} width={32} height={32} />
                    <Box>
                      <Typography variant="body2" className={classes.name}>{tx.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{tx.category}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tx.category}
                    size="small"
                    className={classes.chip}
                    style={{
                      backgroundColor: bg,
                      color: text,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Box className={classes.iconCircle}>
                      {icon}
                    </Box>
                    
                    <Typography variant="body2" ml={2}>{type}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" className={classes.price} style={{ color: isNegative ? 'var(--color-error)' : 'var(--color-success)' }}>{tx.price}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>}
    </Paper>
  );
};

export default TransactionTable;