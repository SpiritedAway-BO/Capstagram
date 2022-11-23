import React from 'react';
import { FlatList, View, ScrollView, StyleSheet } from 'react-native';
import Post from './Post.js';

const UserPage = () => {
  return (
    <View>
      <View>
        {}
      </View>
      <View style={styles.mainContainer}>
        <FlatList styles={{flex: 1}}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </FlatList>
        {/* <ScrollView style={styles.feedContainer}>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
        </ScrollView> */}
      </View>
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

export default UserPage;