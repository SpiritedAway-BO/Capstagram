import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Posts = (props) => {

  return (
    <View style={styles.postsContainer}>
      <View style={styles.postStats} >
        <Text style={styles.textStyle}>
          #12344546
        </Text>
        <Text style={styles.textStyle}>
          Posts
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    flex: .5,
    // width: '30%',
    justifyContent: 'center',
  },
  postStats: {
    alignSelf: 'center',
    alignContents: 'center',
    textAlign: 'center',
    justifySelf: 'center',
    marginLeft: '15%',
    width: '100%',
  },
  textStyle: {
    color:"black",
    textAlign: 'center'
  }
});

export default Posts;

