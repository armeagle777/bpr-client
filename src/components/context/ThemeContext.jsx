import { createContext, useState, useContext, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { THEME_MODS } from '../../utils/constants';

const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: THEME_MODS.LIGHT,
});

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === THEME_MODS.DARK ? THEME_MODS.DARK : THEME_MODS.LIGHT;
  });

  const theme = createTheme({
    palette: { mode },
  });

  const toggleTheme = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === THEME_MODS.DARK ? THEME_MODS.LIGHT : THEME_MODS.DARK;
      localStorage.setItem('themeMode', nextMode);
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
