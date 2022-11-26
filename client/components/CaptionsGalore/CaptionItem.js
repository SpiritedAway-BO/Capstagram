import React, {useState, useEffect} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';

const CaptionItem = ({ caption }) => {
  const [voted, setVoted] = useState(caption.voted);
  const [votes, setVotes] = useState(caption.upvotes);
  // const [newCaption, setNewCaption] = useState('');

  useEffect(() => {
    setVotes(caption.upvotes); //takes care of asynchronous state setting
  }, []);

  const handleCaptionSubmit = (event) => {
    event.preventDefault();
    console.log('newCaption', newCaption.current.value);
  }

  /* will need to send put/patch state to database, or somehow keep track of uservotes and also specifically THIS user's vote */

  return (
    <View style={styles.bigItem}>
    <View style={styles.item}>
      <View style={styles.captionIntro}>
      <View style={styles.userInfo} >
        <Avatar image={{ uri: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png' }}
          size={35}
          style={styles.avatar}
        />
        <Text style={styles.username}>{caption.username}</Text>
        </View>
      { voted ?
        <View style={styles.heartIcon} >
          <Text style={styles.votes}>{votes}</Text>
          <Ionicons name="ios-heart" size={15} color="#FF842B"
            onPress={() => {
              setVotes(votes - 1);
              setVoted(!voted);
            }}/>
        </View> :
        <View style={styles.heartIcon} >
          <Text style={styles.votes}>{votes}</Text>
          <Ionicons style={styles.heartIcon} name="ios-heart-outline" size={15} color="#FF842B"
            onPress={() => {
              setVotes(votes + 1);
              setVoted(!voted);
            }}
          />
        </View>}
      </View>
      <Text style={styles.title}>{caption.caption}</Text>
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
    // borderBottomWidth: 1,
    // borderColor: '#d6d6d6',
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


