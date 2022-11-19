import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppBar } from '@react-native-material/core';

import AccountPage from './components/AccountPage/AccountPage.js';

export default function App() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.topBarView}>
        <AppBar title="Capstagram" color="black" position="sticky" trailing={<Text color='white'>'hi'</Text>} style={styles.appBar}/>
      </View>
      <View style={styles.container}>
        <AccountPage style={styles.userPage}/>
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
  },
  appBar: {
  },
  userPage: {
  },
  safeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
