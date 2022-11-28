import React, {useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { Avatar, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext.js';
import { LOCALTUNNEL } from '../Auth/firebase/config.js';

const CaptionItem = ({ caption }) => {
  const { currentUser } = useContext(AppContext);

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

  const checkVoted = () => {
    let heart = false;
    for (let i = 0; i < caption.likeUsers.length; i++) {
      if (caption.likeUsers[i].username === currentUser.displayName) {
        heart = true;
        break;
      }
    }
    return heart;
  };

  const [voted, setVoted] = useState(checkVoted());
  const [votes, setVotes] = useState(0);
  const [avatarUri, setAvatarUri] = useState('https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png');


  useEffect(() => {
    caption.likes ? setVotes(caption.likes) : null;
    caption.captioner.profilePicURI ? setAvatarUri(caption.captioner.profilePicURI) : null;
  }, []);

  return (
    <View style={styles.bigItem}>
      <View style={styles.item}>
        <View style={styles.captionIntro}>
          <View style={styles.userInfo} >
            <Avatar image={{ uri: caption.captioner.profilePicURI }}
              size={35}
              style={styles.avatar}
            />
            <Text style={styles.username}>{caption.captioner.username}</Text>
          </View>
          { voted ?
            <View style={styles.heartIcon} >
              <Text style={styles.votes}>{caption.likes}</Text>
              <Ionicons name="ios-heart" size={15} color="#FF842B"
                onPress={() => {
                  heart();
                  setVoted(!voted);
                }}/>
            </View> :
            <View style={styles.heartIcon} >
              <Text style={styles.votes}>{caption.likes}</Text>
              <Ionicons style={styles.heartIcon} name="ios-heart-outline" size={15} color="#FF842B"
                onPress={() => {
                  heart();
                  setVoted(!voted);
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


