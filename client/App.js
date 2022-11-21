import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppBar } from '@react-native-material/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AccountPage from './components/AccountPage/AccountPage.js';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.topBarView}>
          <AppBar title="Capstagram" color="black" position="sticky" trailing={<Text color='white'>'hi'</Text>} style={styles.appBar}/>
        </View>
        <View style={styles.container}>
          <AccountPage style={styles.userPage}/>
        </View>
      </SafeAreaView>
    </QueryClientProvider>
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
