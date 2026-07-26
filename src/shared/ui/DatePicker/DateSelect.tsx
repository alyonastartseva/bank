import { MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DateSelectProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const years = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

const getDaysInMonth = (monthName: string, year: string, months: string[]) => {
  const monthIndex = months.indexOf(monthName);
  if (monthIndex === -1 || !year) return 31;
  return new Date(Number(year), monthIndex + 1, 0).getDate();
};

export const DateSelect = ({
  value,
  onChange,
  readOnly = false,
}: DateSelectProps) => {
  const { t } = useTranslation();
  const months = t('editProfile.months', { returnObjects: true }) as string[];

  const parts = value?.trim().split(' ') ?? [];
  const day = parts[0] ?? '';
  const month = parts[1] ?? '';
  const year = parts[2] ?? '';

  const daysInMonth = getDaysInMonth(month, year, months);
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    String(i + 1).padStart(2, '0')
  );

  const updateDate = (field: 'day' | 'month' | 'year', newValue: string) => {
    const newDate = { day, month, year, [field]: newValue };

    const newDaysInMonth = getDaysInMonth(
      field === 'month' ? newValue : month,
      field === 'year' ? newValue : year,
      months
    );
    const correctedDay =
      Number(newDate.day) > newDaysInMonth
        ? String(newDaysInMonth).padStart(2, '0')
        : newDate.day;

    onChange(`${correctedDay} ${newDate.month} ${newDate.year}`);
  };

  const getSelectStyles = (readOnly: boolean) => ({
    pointerEvents: readOnly ? 'none' : 'auto',
    '& .MuiSelect-icon': { display: readOnly ? 'none' : 'block' },
    '&:before': { borderBottomColor: '#F4F4F4' },
    '&:after': { borderBottomColor: readOnly ? 'transparent' : '#1976D2' },
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        gap: '8px',
      }}
    >
      <Select
        value={day || ''}
        variant="standard"
        onChange={(e) => updateDate('day', e.target.value)}
        sx={getSelectStyles(readOnly)}
        style={{ width: '100%', maxWidth: '150px' }}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        {days.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={month || ''}
        variant="standard"
        onChange={(e) => updateDate('month', e.target.value)}
        sx={getSelectStyles(readOnly)}
        style={{ width: '100%', maxWidth: '150px' }}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        {months.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={year || ''}
        variant="standard"
        onChange={(e) => updateDate('year', e.target.value)}
        sx={getSelectStyles(readOnly)}
        style={{ width: '100%', maxWidth: '150px' }}
        MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
      >
        {years.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
