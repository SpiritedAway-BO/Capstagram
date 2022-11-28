import { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from '@react-native-material/core';
import Caption from './Caption.js';
import { AppContext } from '../../contexts/AppContext.js';

const Post = ({ post, navigation }) => {
  const { setCurrentPost } = useContext(AppContext);

  const captions = post.captions.slice().sort((a, b) => b.likes - a.likes).slice(0, 3);

  return (
    <View style={styles.postContainer}>
      <View style={styles.creatorInfo}>
        <Avatar
          image={{ uri: post.creator.profilePicURI }}
          size={35}
          style={styles.avatar} />
        <Text style={styles.username}>{post.creator.username}</Text>
      </View>
      <View>
        <Image
          source={{ uri: post.url }}
          style={styles.image} />
      </View>
      <View style={styles.captionsContainer}>
        {captions.map(caption => <Caption key={caption.id} caption={caption} />)}
      </View>
      <View style={styles.viewAllContainer}>
        <Text
          style={styles.vewAllText}
          onPress={() => {
            setCurrentPost(post);
            navigation.navigate('Captions');
          }}>
          View all {post.captions.length} captions
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
