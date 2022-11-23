import React, {useState, useEffect} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import WinsFeed from './WinsFeed.js';

var DATA = [{
  id: 1234567,
  photoUser: 'ThisGuy1',
  photoURL: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
  caption: 'It\'s the little things in life',
  topCaptioner: 'MeMyselfAndI',
  upvotes: 5,
  voted: true,
  timestamp: Date(),
},
{
  id: 1234568,
  photoUser: 'ThisGuy2',
  photoURL: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
  caption: 'Let me show you my Pokemon!',
  upvotes: 15,
  topCaptioner: 'MeMyselfAndI',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234569,
  photoUser: 'ThisGuy3',
  caption: 'Are we there yet?',
  photoURL: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
  upvotes: 180,
  topCaptioner: 'MeMyselfAndI',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234570,
  photoUser: 'ThisGuy4',
  photoURL: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
  caption: 'Let me show you the world!',
  upvotes: 33,
  topCaptioner: 'MeMyselfAndI',
  voted: true,
  timestamp: Date(),
},
{
  id: 1234571,
  photoUser: 'ThisGuy1',
  photoURL: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
  caption: 'All your base are belongs to us!',
  upvotes: 2,
  topCaptioner: 'MeMyselfAndI',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234572,
  photoUser: 'ThisGuy2',
  photoURL: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
  caption: 'I can haz cheezburger?',
  upvotes: 4,
  topCaptioner: 'MeMyselfAndI',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234573,
  photoUser: 'ThisGuy3',
  photoURL: 'https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?w=2000',
  caption: 'Momma said there\'d be days like this...',
  upvotes: 12,
  topCaptioner: 'MeMyselfAndI',
  voted: false,
  timestamp: Date(),
},
];

export default function PersonalWins() {
  // receives array of posts where this user is top commenter and Renders each post
  const renderTopPost = ({ item }) => (
    <WinsFeed photo={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={DATA}
        renderItem={renderTopPost}
        keyExtractor={item => item.id}
      />

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    fontSize: 24,
    paddingHorizontal: 5,
  },
  avatar: {
    borderRadius: '50%',
  },
});