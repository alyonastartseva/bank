import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const StyledTextField = styled(TextField)(() => ({
	'& .MuiInput-root': {
		marginTop: '24px',
		paddingLeft: 0,
		paddingRight: 0,
	},
	'& .MuiInputBase-adornedStart': {
		paddingLeft: 0,
		paddingRight: 0,
	},
	// Нижняя граница (обычное состояние)
	'& .MuiInput-underline:before': {
		borderBottomColor: '#F4F4F4',
		borderBottomWidth: '2px',
	},
	// Нижняя граница при наведении
	'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
		borderBottomColor: '#BDBDBD',
		borderBottomWidth: '2px',
	},
	// Нижняя граница в фокусе
	'& .MuiInput-underline:after': {
		borderBottomColor: '#1976D2',
		borderBottomWidth: '2px',
	},
	// Нижняя граница при ошибке
	'& .MuiInput-underline.Mui-error:after': {
		borderBottomColor: '#F44336',
	},
	// Стили самого инпута
	'& .MuiInput-input': {
		fontSize: '18px',
		padding: '8px 0',
	},
	// Стили для адаптеров иконок (прижимаем к краям)
	'& .MuiInputAdornment-root': {
		margin: 0,
	},
	'& .MuiInputAdornment-positionStart': {
		marginRight: '16px', 
	},
	'& .MuiInputAdornment-positionEnd': {
		marginLeft: '16px', 
	},
	// Стили лейбла
	'& .MuiInputLabel-root': {
		color: '#A2A2A7',
		fontSize: '20px',
	},
	'& .MuiInputLabel-root.Mui-focused': {
		color: '#000000',
	},
	'& .MuiInputLabel-root.Mui-error': {
		color: '#F44336',
	},
	// Стили вспомогательного текста
	'& .MuiFormHelperText-root': {
		fontSize: '12px',
	},
}));