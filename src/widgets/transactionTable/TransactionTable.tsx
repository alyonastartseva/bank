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
  useTheme,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/hooksReducer';
import { sellAllTransactions } from "@/app/store/slices/bankSlice.ts";
import { useTranslation } from "react-i18next";

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
      return { bg: '#f3e5f5', text: '#9c27b0' };
    case 'Music':
      return { bg: '#e8f5e9', text: '#4caf50' };
    case 'Transaction':
      return { bg: '#e3f2fd', text: '#1976d2' };
    case 'Shop':
      return { bg: '#fff3e0', text: '#ff9800' };
    default:
      return { bg: '#f5f5f5', text: '#616161' };
  }
};

const TransactionTable = () => {
  const theme = useTheme();
  const transactions = useAppSelector((state) => state.bank.transactions);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Paper sx={{
      width: '100%',
      overflowX: 'auto',
      height: '350px',
      overflowY: 'auto',
      bgcolor: 'background.paper', // адаптивный фон
      padding: '0 20px 0 20px',
      boxShadow: 'none',
      border: `1px solid ${theme.palette.divider}`, // адаптивная граница
      borderRadius: 'var(--radius-sm)',
    }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
        <Typography variant="h6" sx={{fontWeight: '600'}}>
          {t("transaction.title")}
        </Typography>
        <Button variant="outlined" onClick={() => dispatch(sellAllTransactions())}>
          {t("transaction.sellAll")}
        </Button>
      </Box>

      {!transactions.length && <Box textAlign="center" py={5}>
        <Typography color="textSecondary">{t("transaction.empty")}</Typography>
      </Box>}

      {!!transactions.length && <Table sx={{ minWidth: 426 }}>
        <TableHead sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary' }}>Получатель</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Категория</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Тип</TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary' }}>Сумма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => {
            const { type, icon } = getTransactionType(tx.name, tx.price);
            const isNegative = tx.price.startsWith('-');
            const priceColor = isNegative ? 'error.main' : 'success.main';
            const { bg, text } = getCategoryColors(tx.category);

            return (
              <TableRow key={tx.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <img src={tx.icon} alt={tx.name} width={32} height={32} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>{tx.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{tx.category}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={tx.category}
                    size="small"
                    sx={{
                      bgcolor: bg,
                      color: text,
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Box sx={{backgroundColor: 'action.hover', borderRadius: '50%', padding: '10px 10px 5px 10px'}}>
                      {icon}
                    </Box>
                    
                    <Typography variant="body2" ml={2}>{type}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600} color={priceColor}>{tx.price}</Typography>
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