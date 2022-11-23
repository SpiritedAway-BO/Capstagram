import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from './MainNav.js';
import CaptionsGalore from '../CaptionsGalore/CaptionsGalore.js';
import SignUp from '../Auth/SignUp.js';
import Login from '../Auth/LoginPage.js';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}/>
        <Stack.Screen
          name="SignIn"
          component={SignUp}
          options={{
            headerShown: false,
          }}/>
        <Stack.Screen
          name="Capstagram"
          component={MainNav}
          options={{
            headerStyle: {
              backgroundColor: '#B19CD9',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTintColor: '#301934',
            headerBackVisible: false,
          }}/>
        <Stack.Screen
          name="Captions"
          component={CaptionsGalore}
          options={{
            headerStyle: {
              backgroundColor: '#B19CD9',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
            headerTintColor: '#301934',
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
