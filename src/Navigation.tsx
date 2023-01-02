import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ROUTES} from './common/routes';
import DestinationsContextProvider from './context/DestinationsContext';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import AuthContextProvider from './context/AuthContext';
import RegisterScreen from './screens/RegisterScreen';
import AccountScreen from './screens/AccountScreen';
import SettingsScreen from './screens/SettingsScreen';
import MapScreen from './screens/MapScreen';
import DestinationDetailsScreen from './screens/DestinationDetailsScreen';
const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <DestinationsContextProvider>
          <Stack.Navigator
            initialRouteName={ROUTES.LANDING_SCREEN}
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}>
            <Stack.Screen
              name={ROUTES.LANDING_SCREEN}
              component={LandingScreen}
            />
            <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
            <Stack.Screen
              name={ROUTES.REGISTER_SCREEN}
              component={RegisterScreen}
            />
            <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.MAP_SCREEN} component={MapScreen} />
            <Stack.Screen
              name={ROUTES.ACCOUNT_SCREEN}
              component={AccountScreen}
            />
            <Stack.Screen
              name={ROUTES.SETTINGS_SCREEN}
              component={SettingsScreen}
            />
            <Stack.Screen
              name={ROUTES.DESTINATION_DETAILS_SCREEN}
              component={DestinationDetailsScreen}
            />
          </Stack.Navigator>
        </DestinationsContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default Navigation;
