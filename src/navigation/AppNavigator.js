// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import GeneralInsuranceScreen from '../screens/GeneralInsuranceScreen';
import LifeInsuranceScreen from '../screens/LifeInsuranceScreen';
import AssetsInsuranceScreen from '../screens/AssetsInsuranceScreen';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
      }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
            />
            <Stack.Screen
              name="GeneralInsurance"
              component={GeneralInsuranceScreen}
            />
            <Stack.Screen
              name="LifeInsurance"
              component={LifeInsuranceScreen}
            />
            <Stack.Screen
              name="AssetsInsurance"
              component={AssetsInsuranceScreen}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}