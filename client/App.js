import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppBar } from "@react-native-material/core";

import UserPage from './components/UserPage/UserPage.js';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.topBarView}>
        <AppBar title="Capstagram" color="black" position="sticky" trailing={<Text>'hi'</Text>} style={styles.appBar}/>
      </View>
      <View style={styles.container}>
        <UserPage style={styles.userPage} />
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
});
