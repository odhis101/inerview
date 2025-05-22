// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useMemo } from 'react';
import { colors } from '../theme/colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference from AsyncStorage
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        // You can implement AsyncStorage here if you want to persist the theme
        // const savedTheme = await AsyncStorage.getItem('darkMode');
        // if (savedTheme !== null) {
        //   setIsDarkMode(savedTheme === 'true');
        // }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load theme preference', error);
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    const saveThemePreference = async () => {
      try {
        // await AsyncStorage.setItem('darkMode', isDarkMode.toString());
      } catch (error) {
        console.error('Failed to save theme preference', error);
      }
    };

    if (!isLoading) {
      saveThemePreference();
    }
  }, [isDarkMode, isLoading]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = useMemo(() => ({
    colors: isDarkMode ? {
      ...colors,
      background: colors.gray900,
      surface: colors.gray800,
      textPrimary: colors.gray100,
      textSecondary: colors.gray300,
      textMuted: colors.gray400,
      // Override any other colors you want to change in dark mode
      gray200: colors.gray700,
      gray300: colors.gray600,
    } : colors,
    isDarkMode,
    toggleTheme,
    isLoading,
  }), [isDarkMode, isLoading]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);