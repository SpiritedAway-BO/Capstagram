import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppBar, IconButton, Stack, HStack, Button } from '@react-native-material/core';
import { Octicons, Entypo, AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import MainFeed from './components/MainFeed/MainFeed.js';
import AccountPage from './components/AccountPage/AccountPage.js';
import Auth from './components/Auth/LoginPage.js';
import UserPage from './components/UserPage/UserPage.js';
import AddPhoto from './components/AddPhoto/AddPhoto.js';
import CaptionsGalore from './components/CaptionsGalore/CaptionsGalore.js';
import Friends from './components/Friends/Friends.js';
import Search from './components/Search/Search.js';

// const NavStack = createNativeStackNavigator();

const queryClient = new QueryClient();

HomeScreen = ({ navigation }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topBarView}>
          <AppBar
          title="Capstagram"
          color="black"
          position="sticky"
          trailing={props => (
            <IconButton icon={props => <Octicons name="diff-added" size={28} color="white" />} {...props} />
          )}
          style={styles.appBar}
        />
        </View>
      {/* <MainFeed/> */}
        <View style={styles.container}>
          <Stack divider={true} spacing={2}>
          <Button title="Account Page" onPress={() => navigation.navigate('Account Page')} />
          <Button title="Add Photo" onPress={() => navigation.navigate('Add Photo')} />
          <Button title="Authentication" onPress={() => navigation.navigate('Auth')} />
          <Button title="Captions Galore" onPress={() => navigation.navigate('Captions Galore')} />
          <Button title="Friends" onPress={() => navigation.navigate('Friends')} />
          <Button title="Main Feed" onPress={() => navigation.navigate('Main Feed')} />
          <Button title="Search" onPress={() => navigation.navigate('Search')} />
          <Button title="User Page" onPress={() => navigation.navigate('User Page')} />
        </Stack>
        {/* <AccountPage style={styles.userPage} /> */}
      </View>
      <View style={styles.bottomBarView}>
        <AppBar
          variant="bottom"
          color="black"
          leading={props => (
            <HStack spacing={80}>
              <IconButton icon={props => <Entypo name="home" size={28} color="white" />}{...props} />
              <IconButton icon={props => <AntDesign name="search1" size={28} color="white" />}{...props} />
            </HStack>
          )}
          trailing={props => (
            <HStack spacing={80}>
              <IconButton icon={props => <AntDesign name="user" size={28} color="white" />}{...props} />
              <IconButton icon={props => <Entypo name="dots-three-vertical" size={28} color="white" />}{...props} />
            </HStack>
          )}
          style={styles.bottomAppBar}
        />
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const NavStack = createNativeStackNavigator();

App = () => {
  return (
    <NavigationContainer>
      <NavStack.Navigator initialRouteName="Home">
        <NavStack.Screen name="Home" component={HomeScreen} />
        <NavStack.Screen name="Main Feed" component={MainFeed} />
        <NavStack.Screen name="Auth" component={Auth} />
        <NavStack.Screen name="User Page" component={UserPage} />
        <NavStack.Screen name="Account Page" component={AccountPage} />
        <NavStack.Screen name="Add Photo" component={AddPhoto} />
        <NavStack.Screen name="Captions Galore" component={CaptionsGalore} />
        <NavStack.Screen name="Friends" component={Friends} />
        <NavStack.Screen name="Search" component={Search} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarView: {
    width: '100%',
    paddingBottom: 20,
  },
  bottomBarView: {
    width: '100%',
  },
  appBar: {
  },
  bottomAppBar: {
  },
  userPage: {
  },
  safeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  bottomIcons: {
    flexDirection: 'row',
  },
});
