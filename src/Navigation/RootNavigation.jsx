import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OnboardingScreen from '../views/Onboarding/OnbaoridngScreen';
import Login from '../views/Auth/Login/Login';
import Register from '../views/Auth/Register/Register';
import Verify from '../views/Auth/Register/Verify';
import Profile from '../views/Auth/Register/Profile';
import Location from '../views/Auth/Register/Location';
import CompleteProfile from '../views/Auth/Register/CompleteProfile';
import Home from '../views/Home/Home';
// import Ionicons from 'react-native-vector-icons/Ionicons';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="ProfileCompletion" component={Profile} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      </Stack.Navigator>
      {/* <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Home} />
      </Tab.Navigator> */}
    </NavigationContainer>
  );
};

export default RootNavigation;
