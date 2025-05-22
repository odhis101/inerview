// src/components/ThemeToggle.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.toggle}>
      <MaterialCommunityIcons 
        name={isDarkMode ? 'weather-sunny' : 'weather-night'} 
        size={24} 
        color={isDarkMode ? '#F4C430' : '#000'} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    padding: 10,
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
});

export default ThemeToggle;