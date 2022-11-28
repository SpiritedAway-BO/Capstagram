import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext.js';
import { LOCALTUNNEL } from '../Auth/firebase/config.js';


export default function TopCaption({ caption, topCaptioner, voted, upvotes }) {
  const [allVotes, setAllVotes] = useState(upvotes);
  const [userVoted, setUserVoted] = useState(voted);
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    setAllVotes(upvotes);
    setUserVoted(voted);
  }, [])

  const checkLike = () => {
    let heart = false;
    if (caption.likeUsers) {
      for (let i = 0; i < caption.likeUsers.length; i++) {
        if (caption.likeUsers[i].username === currentUser.displayName) {
          heart = true;
          break;
        }
      }
      return heart;

    }
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
  }

  return (
    <View style={styles.captionContainer}>
      <View style={styles.captionerInfo}>
        <Text style={styles.username}>{topCaptioner}</Text>
        <Text>{caption}</Text>
      </View>
        { userVoted ?
        <View style={styles.heartIcon} >
          <Text style={styles.title}>{allVotes}</Text>
          <Ionicons name="ios-heart" size={15} color="#FF842B"
            onPress={() => {
              heart();
              setAllVotes(allVotes - 1);
              setUserVoted(!userVoted);
            }}/>
        </View> :
        <View style={styles.heartIcon} >
          <Text style={styles.title} >{allVotes}</Text>
          <Ionicons style={styles.heartIcon} name="ios-heart-outline" size={15} color="#FF842B"
            onPress={() => {
              heart();
              setAllVotes(allVotes + 1);
              setUserVoted(!userVoted);
            }}
          />
        </View>}
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
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  likeNumber: {
    color: '#FF842B',
  },
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  heartIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    // fontSize: 24,
    paddingHorizontal: 5,
  },
  avatar: {
    borderRadius: '50%',
  },
});
