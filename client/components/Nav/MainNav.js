import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainFeed from '../MainFeed/MainFeed.js';
import Search from '../Search/Search.js';
import AddPhotoCloudinary from '../AddPhoto/AddPhotoCloudinary.js';
import UserPage from '../UserPage/UserPage.js';
import AccountPage from '../AccountPage/AccountPage.js';
import Friends from '../Friends/Friends.js';
import SignUp from '../Auth/SignUp.js';

const Tab = createBottomTabNavigator();

const MainNav = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF842B',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={MainFeed} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Add" component={AddPhotoCloudinary} />
        <Tab.Screen name="Profile" component={UserPage} />
        <Tab.Screen name="Settings" component={AccountPage} />
      </Tab.Navigator>
    </>
  );
};

export default MainNav;
