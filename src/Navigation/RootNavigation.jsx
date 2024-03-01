import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../views/Onboarding/OnbaoridngScreen';
import Login from '../views/Auth/Login/Login';
import Register from '../views/Auth/Register/Register';
import Verify from '../views/Auth/Register/Verify';
import Profile from '../views/Auth/Register/Profile';
import CompleteProfile from '../views/Auth/Register/CompleteProfile';
import Home from '../views/Protected/Home';
import Map from '../views/Protected/Map';
import BarberDetails from '../views/Protected/BarberDetails';
import BookAppointment from '../views/Protected/BookAppointment';
import PaymentMethod from '../views/Protected/PaymentMethod';
import Chat from '../views/Protected/Chat';
import Notifications from '../views/Protected/Notifications';
import CompleteBarberProfile from '../views/Auth/Register/CompleteBarberProfile';
import ProfileSettings from '../views/Protected/ProfileSettings';
import PaymentConfrm from '../views/Protected/PaymentConfirm';
import BarberHome from '../views/Protected/Barber/Home';
import BarberBookings from '../views/Protected/Barber/BarberBookings';
import Filters from '../components/Filters';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Onboarding'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ProfileCompletion" component={Profile} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="BarberDetails" component={BarberDetails} />
        <Stack.Screen name="Appointment" component={BookAppointment} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        <Stack.Screen name="PaymentConfirm" component={PaymentConfrm} />
        <Stack.Screen name="Filters" component={Filters} />
        <Stack.Screen
          name="CompleteBarberProfile"
          component={CompleteBarberProfile}
        />
        <Stack.Screen name="BarberHome" component={BarberHome} />
        <Stack.Screen name="BarberBookings" component={BarberBookings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
