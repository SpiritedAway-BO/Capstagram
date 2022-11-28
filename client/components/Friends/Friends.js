import React, {useState, useEffect, useContext} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';
import FriendItem from './FriendItem.js';
import { AppContext}  from '../../contexts/AppContext.js';
import axios from 'axios';
import {LOCALTUNNEL} from '../Auth/firebase/config.js';


const Friends = () => {
  const {friends, setFriends, currentUser, setCurrentUser} = useContext(AppContext);
  console.log('friends', friends)
  useEffect(() => {
    setFriends(friends)
  }, [])

  const renderFriend = ({ item }) => (
    <FriendItem caption={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={friends}
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
  },
  item: {
    backgroundColor: '#fff',
    paddingTop: 12,
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  title: {
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
