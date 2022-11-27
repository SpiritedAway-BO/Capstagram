import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { Avatar, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';
import axios from 'axios';

const CaptionItem = ({ caption }) => {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(0);
  const [avatarUri, setAvatarUri] = useState('https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png');

  // console.log(caption)
  // const [newCaption, setNewCaption] = useState('');

  useEffect(() => {
    console.log('caption', caption)
    caption.upvotes ? setVotes(caption.upvotes) : null;
    // setVotes(caption.upvotes); //takes care of asynchronous state setting
    caption.usericon ? setAvatarUri(caption.usericon) : setAvatarUri('https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png');
  }, []);

  // const putUserUpvote = (allVotes) => {
  //   console.log('allVotes', allVotes);
  //   // axios.put('http://link/captionid', {body: {upVotes: allVotes}})

  //     /* will need to send put/patch state to database, or somehow keep track of uservotes and also specifically THIS user's vote */

  // }

  return (
    <View style={styles.bigItem}>
    <View style={styles.item}>
      <View style={styles.captionIntro}>
      <View style={styles.userInfo} >
        <Avatar image={{ uri: avatarUri }}
          size={35}
          style={styles.avatar}
        />
        <Text style={styles.username}>{caption.captioner}</Text>
        </View>
      { voted ?
        <View style={styles.heartIcon} >
          <Text style={styles.votes}>{votes}</Text>
          <Ionicons name="ios-heart" size={15} color="#FF842B"
            onPress={() => {
              setVotes(votes - 1);
              setVoted(!voted);
              console.log(votes - 1);
            }}/>
        </View> :
        <View style={styles.heartIcon} >
          <Text style={styles.votes}>{votes}</Text>
          <Ionicons style={styles.heartIcon} name="ios-heart-outline" size={15} color="#FF842B"
            onPress={() => {
              setVotes(votes + 1);
              setVoted(!voted);
              console.log(votes + 1);

            }}
          />
        </View>}
      </View>
      <Text style={styles.title}>{caption.body}</Text>
    </View>
    <View style={styles.borderSmaller} >
    </View>

    </View>
  );
};

export default CaptionItem;

const styles = StyleSheet.create({
  bigItem: {
    alignItems: 'center',
  },
  borderSmaller: {
    width: '92%',
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  captionIntro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center', //comment out to place username at top of avatar
  },
  heartIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingleft: 2,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 12,
    width: '100%',
  },
  votes: {
    paddingRight: 3,
  },
  username: {
   justifyContent: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  avatar: {
    borderRadius: '50%',
  },
});


