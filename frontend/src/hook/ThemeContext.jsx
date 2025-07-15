import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); 

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      primary: '#00cc6a', 
      secondary: '#00a6cc', 
      accent: '#cc0066', 
      background: '#0a0a0a',
      surface: '#111111', 
      card: '#1a1a1a', 
      text: '#ffffff', 
      textSecondary: '#a0a0a0', 
      textMuted: '#a0a0a0',
      border: '#333333', 
      gradient: 'linear-gradient(135deg, #00cc6a 0%, #00a6cc 100%)',
      codeBackground: '#0d1117',
    } : {
      primary: '#2563eb', 
      secondary: '#7c3aed', 
      accent: '#059669',
      background: '#ffffff', 
      surface: '#f8fafc', 
      card: '#ffffff', 
      text: '#1f2937', 
      textSecondary: '#6b7280', 
      textMuted: '#6b7280', 
      border: '#e5e7eb', 
      gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      codeBackground: '#f6f8fa',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 