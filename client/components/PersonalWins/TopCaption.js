import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TopCaption({ caption, username }) {
  console.log('caption', caption, username)
  const [liked, SetLiked] = useState(caption.liked);

  const heart = (event) => {
    SetLiked(!liked);
  };

  return (
    <View style={styles.captionContainer}>
      <View style={styles.captionerInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text>{caption}</Text>
      </View>
      {liked ?
        <Text style={styles.likeNumber}>
          #
          <Ionicons name="ios-heart" size={15} color="#FF842B" onPress={heart}/>
        </Text> :
        <Text style={styles.likeNumber}>
          #
          <Ionicons name="ios-heart-outline" size={15} color="#FF842B" onPress={heart}/>
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
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  likeNumber: {
    color: '#FF842B',
  }
});
