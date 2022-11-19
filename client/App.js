import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppBar, IconButton, Stack, HStack } from '@react-native-material/core';
import { Octicons, Entypo, AntDesign } from '@expo/vector-icons';

import MainFeed from './components/MainFeed/MainFeed.js';
import AccountPage from './components/AccountPage/AccountPage.js';

export default function App() {
  return (
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
      <MainFeed/>
      <View style={styles.container}>
        <AccountPage style={styles.userPage} />
      </View>
      <View style={styles.bottomBarView}>
        <AppBar
          variant="bottom"
          color="black"
          leading={props => (
            <HStack>
              <IconButton icon={props => <Entypo name="home" size={28} color="white" />}{...props} />
              <IconButton icon={props => <AntDesign name="search1" size={28} color="white" />}{...props} />
            </HStack>
          )}
          trailing={props => (
            <HStack>
              <IconButton icon={props => <AntDesign name="user" size={28} color="white" />}{...props} />
              <IconButton icon={props => <Entypo name="dots-three-vertical" size={28} color="white" />}{...props} />
            </HStack>
          )}
          style={styles.bottomAppBar}
        />
      </View>
    </SafeAreaView>
  );
}

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
    // flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // padding: 0,
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
