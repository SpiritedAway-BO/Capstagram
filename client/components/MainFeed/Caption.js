import { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../../contexts/AppContext.js';
import { LOCALTUNNEL } from '../Auth/firebase/config.js';
import { auth } from '../Auth/firebase/firebase.js';
import axios from 'axios';

export default function Caption({ caption }) {
  const { currentUser } = useContext(AppContext);

  // console.log('log from caption', caption);

  const checkLike = () => {
    let heart = false;
    for (let i = 0; i < caption.likeUsers.length; i++) {
      if (caption.likeUsers[i].username === currentUser.displayName) {
        heart = true;
        break;
      }
    }
    return heart;
  };

  const [liked, SetLiked] = useState(checkLike());

  const heart = (event) => {
    SetLiked(!liked);
    if (liked) {
      caption.likes--;
    } else {
      caption.likes++;
    }
    axios.patch(`${LOCALTUNNEL}/captions/${caption.id}`, {
      userId: currentUser.uid
    });
  };

  return (
    <View style={styles.captionContainer}>
      <View style={styles.captionerInfo}>
        <Text style={styles.username}>
          {caption.captioner.username}
          &nbsp;
          <Text style={styles.caption}>{caption.body}</Text>
        </Text>
      </View>
      {liked ?
        <Text style={styles.likeNumber}>
          {caption.likes}
          <Ionicons name="ios-heart" size={15} color="#FF842B" onPress={heart} />
        </Text> :
        <Text style={styles.likeNumber}>
          {caption.likes}
          <Ionicons name="ios-heart-outline" size={15} color="#FF842B" onPress={heart} />
        </Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    marginBottom: 0,
  },
  captionerInfo: {
    flexDirection: 'row',
    maxWidth: '95%',
    flexWrap: 'wrap',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  likeNumber: {
    color: '#FF842B',
  },
  caption: {
    fontWeight: 'unset',
  }
});
