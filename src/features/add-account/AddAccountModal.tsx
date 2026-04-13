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

interface AccountData {
  userId: string;
  accountNumber: string;
  balance: number;
  currency: string;
  accountType: string;
}

interface AddAccountModalProps {
  open: boolean;
  onClose: () => void;
  onCreateAccount: (data: AccountData) => Promise<void>;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  open,
  onClose,
  onCreateAccount,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    accountNumber: '',
    balance: '',
    currency: 'RUB',
    accountType: 'debit',
  });

  // Для текстовых полей
  const handleTextChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  // Для Select (без any)
  const handleSelectChange = (field: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({ ...formData, [field]: event.target.value as string });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await onCreateAccount({
        userId: formData.userId,
        accountNumber: formData.accountNumber,
        balance: parseFloat(formData.balance),
        currency: formData.currency,
        accountType: formData.accountType,
      });
      onClose();
      setFormData({
        userId: '',
        accountNumber: '',
        balance: '',
        currency: 'RUB',
        accountType: 'debit',
      });
    } catch (error) {
      console.error('Ошибка при создании счета:', error);
      alert('Ошибка при создании счета. Попробуйте позже.');
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
              value={formData.userId}
              onChange={handleTextChange('userId')}
              required
              fullWidth
            />
            <TextField
              label="Номер счета (20 цифр)"
              value={formData.accountNumber}
              onChange={handleTextChange('accountNumber')}
              required
              fullWidth
              inputProps={{ maxLength: 20, minLength: 20 }}
            />
            <TextField
              label="Начальный баланс"
              type="number"
              value={formData.balance}
              onChange={handleTextChange('balance')}
              required
              fullWidth
            />
            <TextField
              label="Код валюты (ISO 4217)"
              value={formData.currency}
              onChange={handleTextChange('currency')}
              required
              fullWidth
              placeholder="RUB, USD, EUR"
            />
            <FormControl fullWidth required>
              <InputLabel>Тип счета</InputLabel>
              <Select
                value={formData.accountType}
                label="Тип счета"
                onChange={handleSelectChange('accountType')}
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