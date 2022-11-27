import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from '@react-native-material/core';
import Caption from './Caption.js';

const dummyData = [
  {
    username: 'username1',
    caption: 'caption1',
    liked: true
  },
  {
    username: 'username2',
    caption: 'caption2',
    liked: false
  },
  {
    username: 'username3',
    caption: 'caption3',
    liked: false
  }
];

const Post = ({ navigation }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.creatorInfo}>
        <Avatar
          image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={35}
          style={styles.avatar}/>
        <Text style={styles.username}>username</Text>
      </View>
      <View>
        <Image
          source={{uri: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000'}}
          style={styles.image}/>
      </View>
      <View style={styles.captionsContainer}>
        {dummyData.map(caption => <Caption caption={caption}/>)}
      </View>
      <View style={styles.viewAllContainer}>
        <Text
          style={styles.vewAllText}
          onPress={() => navigation.navigate('Captions')}>
            View all # captions
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    marginBottom: 25,

  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  avatar: {
    marginRight: 5,
  },
  username: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 350,
  },
  captionsContainer: {
    padding: 5,
  },
  viewAllContainer: {
    justifyContent: 'center',
    margin: 5,
    marginTop: 0,
  },
  vewAllText: {
    color: '#FF842B',
    padding: 5,
  }
});

export default Post;