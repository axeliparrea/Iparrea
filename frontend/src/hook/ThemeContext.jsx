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
      // Dark/Hacker theme
      primary: '#00ff88', // Neon green
      secondary: '#ff0080', // Neon pink
      accent: '#00d4ff', // Neon blue
      background: '#0a0a0a', // Deep black
      surface: '#111111', // Dark surface
      card: '#1a1a1a', // Card background
      text: '#ffffff', // White text
      textMuted: '#a0a0a0', // Muted text
      border: '#333333', // Border color
      gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #ff0080 100%)',
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
      textMuted: '#6b7280', // Muted text
      border: '#e5e7eb', // Border color
      gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #059669 100%)',
      codeBackground: '#f6f8fa',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}; 