import { createContext, useState, useContext, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: 'light',
});

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'dark' ? 'dark' : 'light';
  });

  const theme = createTheme({
    palette: { mode },
  });

  const toggleTheme = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', nextMode); // save new mode
      return nextMode;
    });
  };

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
