import React, {useState, useEffect} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';
import FriendItem from './FriendItem.js';

var DATA = [
  {
    id: 1234567,
    username: 'thisGuy',
    usericon: '/Users/tthornberryclass/HackReactorSEI/Capstagram/client/assets/favicon.png',
  },
  {
    id: 1234568,
    username: 'thisGuy2',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234569,
    username: 'thisGuy3',
    usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',

  },
  {
    id: 1234570,
    username: 'thisGuy4',
    usericon: '/Users/tthornberryclass/HackReactorSEI/Capstagram/client/assets/favicon.png',
  },
  {
    id: 1234571,
    username: 'thisGuy5',
    usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',

  },
  {
    id: 1234572,
    username: 'thisGuy6',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234573,
    username: 'thisGuy7',
    usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  },
  {
    id: 1234574,
    username: 'thisGuy8',
    usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  },
  {
    id: 1234575,
    username: 'thisGuy9',
    usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  },
  {
    id: 1234576,
    username: 'thisGuy10',
    usericon: '/Users/tthornberryclass/HackReactorSEI/Capstagram/client/assets/favicon.png',
  },
  {
    id: 1234577,
    username: 'thisGuy11',
    usericon: 'https://mui.com/static/images/avatar/1.jpg',
  },
];

// const FriendItem = ({ caption }) => {
//   /*this would be where we could keep track of state for the onPress handler
//   that would potentially take us to the feed with only that friend's photos or captions, depending on what we decide to prioritize theoretically, given a large budget and more time, we could make the friends page have two tabs, one for their photos and one for their captions*/
//   return (
//     <View style={styles.item}>
//       <View style={styles.userInfo} >
//         <Avatar image={{ uri: caption.usericon }} //local OR cloudinary
//           size={35}
//           style={styles.avatar}
//         />
//         <Text style={styles.title}>{caption.username}</Text>
//       </View>
//     </View>
//   );
// };

const Friends = () => {

  const renderFriend = ({ item }) => (
    <FriendItem caption={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={DATA}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    // padding: 20,
    backgroundColor: '#fff',
    // padding: 20,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  title: {
    // fontSize: 20,
    paddingHorizontal: 10,
    height: '100%',
    fontWeight: 'bold',
  },
  avatar: {
    borderRadius: '50%',
  },
  bottomBarView: {
    width: '100%',
  },
});

export default Friends;
