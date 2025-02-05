import OrderSuccessScreen from '@components/checkout/OrderSuccessScreen';
import LoginScreen from '@features/auth/LoginScreen';
import SplashScreen from '@features/auth/SplashScreen';
import CheckoutScreen from '@features/checkout/CheckoutScreen';
import RestaurantScreen from '@features/restaurants/RestaurantScreen';
import AnimatedTabs from '@features/tabs/AnimatedTabs';
import UserBottomTab from '@features/tabs/UserBottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@utils/NavigationUtils';
import { FC } from 'react';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="AnimatedTabs"
          component={AnimatedTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
