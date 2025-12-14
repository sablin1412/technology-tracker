// src/pages/Practice26/Practice26App.jsx
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  FormControlLabel,
  IconButton,
  Snackbar,
  Switch,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';

const THEME_STORAGE_KEY = 'mui-theme-mode';

function Practice26Inner() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success'); // success | error | warning | info
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [autoHideDuration] = useState(4000);

  const [mode, setMode] = useState('light');

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiSnackbar: {
            defaultProps: {
              anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
            },
          },
        },
      }),
    [mode]
  );

  const openSnackbar = (type, message) => {
    setSnackbarType(type);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const renderIcon = () => {
    switch (snackbarType) {
      case 'success':
        return <CheckCircleIcon fontSize="inherit" />;
      case 'error':
        return <ErrorIcon fontSize="inherit" />;
      case 'warning':
        return <WarningAmberIcon fontSize="inherit" />;
      default:
        return <InfoIcon fontSize="inherit" />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          maxWidth: 960,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            mb: 3,
            gap: 1.5,
          }}
        >
          <Typography variant="h4" component="h1">
            Практика 26: MUI уведомления и темы
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={mode === 'dark'}
                onChange={(e) => setMode(e.target.checked ? 'dark' : 'light')}
                inputProps={{ 'aria-label': 'Переключение темы (светлая/тёмная)' }}
              />
            }
            label={mode === 'dark' ? 'Тёмная тема' : 'Светлая тема'}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => openSnackbar('success', 'Операция выполнена успешно.')}
          >
            Success
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => openSnackbar('error', 'Произошла ошибка при выполнении операции.')}
          >
            Error
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={() =>
              openSnackbar('warning', 'Обрати внимание: требуется дополнительная проверка.')
            }
          >
            Warning
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={() =>
              openSnackbar('info', 'Информационное уведомление о статусе процесса.')
            }
          >
            Info
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ mt: 3, color: 'text.secondary' }}
        >
          Попробуй открыть страницу на мобильном, планшете и десктопе: кнопки уведомлений и
          переключатель темы должны корректно перестраиваться, а Snackbar — адаптивно
          отображаться внизу экрана.
        </Typography>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
          message={null}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarType}
            variant="filled"
            icon={renderIcon()}
            sx={{
              width: '100%',
              alignItems: 'center',
            }}
          >
            {snackbarMessage}
            <IconButton
              size="small"
              aria-label="закрыть уведомление"
              color="inherit"
              onClick={handleClose}
              sx={{ ml: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default Practice26Inner;
