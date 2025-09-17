import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ConfirmationScreen from '@/screens/ConfirmationScreen';
import DashboardScreen from '@/screens/DashboardScreen';
import ProgressScreen from '@/screens/ProgressScreen';
import RiskScreen from '@/screens/RiskScreen';
import UserInfoScreen from '@/screens/UserInfoScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="Risk" component={RiskScreen} />
    </Stack.Navigator>
  );
}
