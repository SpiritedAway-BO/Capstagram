import { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Avatar } from '@react-native-material/core';
import Caption from '../../../MainFeed/Caption.js';


const SinglePostView = ({ post, currentUser, navigation }) => {


  return (
    <View style={styles.postContainer}>
      <View style={styles.creatorInfo}>
        {currentUser.photoURL !== undefined ?
        <Avatar
            image={{ uri: currentUser.photoURL }}
            size={35}
            style={styles.avatar}/>
          :
          <Avatar
            src='./orange.png'
            size={35}
            style={styles.avatar}/>
        }
        <Text style={styles.username}>{currentUser.displayName}</Text>
      </View>
      <View style={{height:'80%'}}>
        <Image
          source={{uri: post.url}}
          style={styles.image}/>
      </View>
      <View style={styles.captionsContainer}>
        { post.captions !== [] ?
          post.captions.map(caption => <Caption key={caption.id} caption={caption}/>)
        :
          <View>
            <Text>
              You do not have any captions for this photo!
            </Text>
          </View>
        }
      </View>
      <View style={styles.viewAllContainer}>
        {/* <Text
          style={styles.viewAllText}
          onPress={() => {
            setCurrentPost(post);
            navigation.navigate('Captions');
          }}>
            View all {post.captions.length} captions
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    marginBottom: 25,
    backgroundColor: 'white',
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
    height: '100%',
  },
  captionsContainer: {
    padding: 5,
  },
  viewAllContainer: {
    justifyContent: 'center',
    margin: 5,
    marginTop: 0,
  },
  viewAllText: {
    color: '#FF842B',
    padding: 5,
  }
});

export default SinglePostView;
