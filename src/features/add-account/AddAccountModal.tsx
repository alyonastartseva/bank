import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
} from '@mui/material';

interface AddAccountModalProps {
  open: boolean;
  onClose: () => void;
  onCreateAccount: (data: {
    userId: string;
    accountNumber: string;
    balance: number;
    currency: string;
    accountType: string;
  }) => Promise<void>;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  open,
  onClose,
  onCreateAccount,
}) => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [currency, setCurrency] = useState('RUB');
  const [accountType, setAccountType] = useState('debit');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onCreateAccount({
        userId,
        accountNumber,
        balance: parseFloat(balance),
        currency,
        accountType,
      });
      onClose();
      setUserId('');
      setAccountNumber('');
      setBalance('');
      setCurrency('RUB');
      setAccountType('debit');
    } catch (error) {
      console.error('Ошибка при создании счета:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавление нового счета</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="ID пользователя"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Номер счета (20 цифр)"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              fullWidth
              inputProps={{ maxLength: 20, minLength: 20 }}
            />
            <TextField
              label="Начальный баланс"
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Код валюты (ISO 4217)"
              value={currency}
              onChange={(e) => setCurrency(e.target.value.toUpperCase())}
              required
              fullWidth
              placeholder="RUB, USD, EUR"
            />
            <FormControl fullWidth required>
              <InputLabel>Тип счета</InputLabel>
              <Select
                value={accountType}
                label="Тип счета"
                onChange={(e) => setAccountType(e.target.value)}
              >
                <MenuItem value="debit">Дебетовый</MenuItem>
                <MenuItem value="credit">Кредитный</MenuItem>
                <MenuItem value="deposit">Депозитный</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Отмена
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Сохранить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};