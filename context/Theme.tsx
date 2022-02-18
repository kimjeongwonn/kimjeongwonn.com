import { ThemeProvider } from '@emotion/react';
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';
import { theme } from '../styles/theme';

const themeContext = createContext<{
  themeState: 'light' | 'dark';
  themeToggle: Dispatch<SetStateAction<'light' | 'dark'>>;
} | null>(null);

interface BlogThemeProviderProps {
  children: React.ReactNode;
}

const BlogThemeProvider = ({ children }: BlogThemeProviderProps) => {
  const [themeState, setThemeState] = useState<'light' | 'dark'>('light');

  const themeToggle = () => {
    setThemeState(themeState === 'light' ? 'dark' : 'light');
  };

  return (
    <themeContext.Provider value={{ themeState, themeToggle }}>
      <ThemeProvider theme={theme[themeState]}>{children}</ThemeProvider>
    </themeContext.Provider>
  );
};

const useBlogTheme = () => {
  const context = useContext(themeContext);

  if (context === null) {
    throw new Error('useBlogTheme must be used within a BlogThemeProvider');
  }

  return { themeState: context.themeState, themeToggle: context.themeToggle };
};

export { BlogThemeProvider, useBlogTheme };
