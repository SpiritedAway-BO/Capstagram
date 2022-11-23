import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import WinPost from './WinPost.js';

const WinsFeed = ({photo}) => {

  return (
    <View style={styles.mainContainer}>
        <WinPost photo={photo} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  feedContainer: {
    width: '100%',
  }
});

export default WinsFeed;
