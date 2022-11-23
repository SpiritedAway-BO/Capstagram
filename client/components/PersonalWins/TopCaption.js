import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TopCaption({ caption, topCaptioner, voted, upvotes }) {
  const [allVotes, setAllVotes] = useState(upvotes);
  const [userVoted, setUserVoted] = useState(voted);

  useEffect(() => {
    setAllVotes(upvotes);
    setUserVoted(voted);
  }, [])

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
              setAllVotes(allVotes - 1);
              setUserVoted(!userVoted);
            }}/>
        </View> :
        <View style={styles.heartIcon} >
          <Text style={styles.title} >{allVotes}</Text>
          <Ionicons style={styles.heartIcon} name="ios-heart-outline" size={15} color="#FF842B"
            onPress={() => {
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
