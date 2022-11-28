import React, {useState, useEffect} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';



const FriendItem = ({ caption }) => {
  /*this would be where we could keep track of state for the onPress handler
  that would potentially take us to the feed with only that friend's photos or captions, depending on what we decide to prioritize theoretically, given a large budget and more time, we could make the friends page have two tabs, one for their photos and one for their captions*/
  return (
    <View style={styles.item}>
      <View style={styles.userInfo} >
        <View style={styles.captionIntro}>
          <Avatar image={{ uri: caption.profilePicURI }} //local OR cloudinary
            size={35}
            style={styles.avatar}
          />
          <Text style={styles.title}>{caption.username}</Text>
        </View>
      </View>
      <View style={styles.borderSmaller}></View>
    </View>
  );
};

export default FriendItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  borderSmaller: {
    width: '92%',
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  captionIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center', //comment out to place username at top of avatar
    padding: 20,
    paddingTop: 12,
    width: '100%',
  },
  title: {
    // fontSize: 20,
    paddingHorizontal: 10,
    height: '100%',
    fontWeight: 'bold',
    alignContent: 'center',
  },
  avatar: {
    borderRadius: '50%',
  },
  bottomBarView: {
    width: '100%',
  },
});

