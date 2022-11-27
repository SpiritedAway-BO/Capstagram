import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Caption({ caption }) {
  const [liked, SetLiked] = useState(caption.liked);

  const heart = (event) => {
    SetLiked(!liked);
  };

  return (
    <View style={styles.captionContainer}>
      <View style={styles.captionerInfo}>
        <Text style={styles.username}>{caption.captioner.username}</Text>
        <Text>{caption.body}</Text>
      </View>
      {liked ?
        <Text style={styles.likeNumber}>
          {caption.likes}
          <Ionicons name="ios-heart" size={15} color="#FF842B" onPress={heart}/>
        </Text> :
        <Text style={styles.likeNumber}>
          {caption.likes}
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
