import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from '@react-native-material/core';
import TopCaption from './TopCaption.js';

const WinPost = ({photo}) => {
  const [post, setPost] = useState(photo);

  useEffect(() => {
    setPost(photo)
  }, [])

  return (
    <View style={styles.postContainer}>
      <View style={styles.creatorInfo}>
        <Avatar
          image={{ uri: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669161707/orange_hhc8pc.png' }}
          size={35}
          style={styles.avatar}/>
        <Text style={styles.username}>{photo.photoUser}</Text>
      </View>
      <View>
        <Image
          source={{uri: photo.photoURL}}
          style={styles.image}/>
      </View>
      <View style={styles.captionsContainer}>
        <TopCaption caption={photo.caption} topCaptioner={photo.topCaptioner } upvotes={photo.upvotes} voted={photo.voted}/>
      </View>
      <View style={styles.viewAllContainer}>
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

export default WinPost;
