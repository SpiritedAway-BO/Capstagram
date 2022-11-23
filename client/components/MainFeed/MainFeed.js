import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Post from './Post.js';

const MainFeed = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.feedContainer}>
        <Post navigation={navigation}/>
        <Post navigation={navigation}/>
        <Post navigation={navigation}/>
        <Post navigation={navigation}/>
        <Post navigation={navigation}/>
      </ScrollView>
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

export default MainFeed;
