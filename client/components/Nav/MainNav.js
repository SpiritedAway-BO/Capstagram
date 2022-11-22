import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MainFeed from '../MainFeed/MainFeed.js';
import Search from '../Search/Search.js';
import AddPhoto from '../AddPhoto/AddPhoto.js';
import UserPage from '../UserPage/UserPage.js';
import AccountPage from '../AccountPage/AccountPage.js';
import Friends from '../Friends/Friends.js';
import SignUp from '../Auth/SignUp.js';
import AddPhotoCloudinary from '../AddPhoto/AddPhotoCloudinary.js';

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
            } else if (route.name === 'Friends') {
              iconName = focused ? 'ios-people' : 'ios-people-outline';
            } else if (route.name === 'Auth') {
              iconName = 'ios-ellipsis-horizontal';
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
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Auth" component={SignUp} />
      </Tab.Navigator>
    </>
  );
};

export default MainNav;
