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
  const [isDark, setIsDark] = useState(true); // Default to dark theme (hacker style)

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
      // Dark Hacker theme - softer colors
      primary: '#00cc6a', // Softer green
      secondary: '#00a6cc', // Softer blue
      accent: '#cc0066', // Softer pink
      background: '#0a0a0a', // Deep black
      surface: '#111111', // Dark surface
      card: '#1a1a1a', // Card background
      text: '#ffffff', // White text
      textSecondary: '#a0a0a0', // Secondary text
      textMuted: '#a0a0a0', // Muted text
      border: '#333333', // Border color
      gradient: 'linear-gradient(135deg, #00cc6a 0%, #00a6cc 100%)',
      codeBackground: '#0d1117',
    } : {
      // Light theme
      primary: '#2563eb', // Blue
      secondary: '#7c3aed', // Purple
      accent: '#059669', // Green
      background: '#ffffff', // White
      surface: '#f8fafc', // Light surface
      card: '#ffffff', // Card background
      text: '#1f2937', // Dark text
      textSecondary: '#6b7280', // Secondary text
      textMuted: '#6b7280', // Muted text
      border: '#e5e7eb', // Border color
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