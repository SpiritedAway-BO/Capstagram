import React, {useState, useEffect} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Stack, Avatar } from '@react-native-material/core';


var DATA = [{
  id: 1234567,
  username: 'thisGuy',
  usericon: '../../assets/favicon.png',
},
{
  id: 1234568,
  username: 'thisGuy2',
  usericon: '../../assets/favicon.png',
},
{
  id: 1234569,
  username: 'thisGuy3',
  usericon: '../../assets/favicon.png',

},
{
  id: 1234570,
  username: 'thisGuy4',
  usericon: '../../assets/favicon.png',
},
{
  id: 1234571,
  username: 'thisGuy5',
  usericon: '../../assets/favicon.png',

},
{
  id: 1234572,
  username: 'thisGuy6',
  usericon: '../../assets/favicon.png',
}];

const FriendItem = ({ caption }) => {
  /*this would be where we could keep track of state for the onPress handler
  that would potentially take us to the feed with onlly that friend's photos or captions, depending on what we decide to prioritize*/
  return (
    <View style={styles.item}>
      <View style={styles.userInfo} >
        <Avatar image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={35}
          style={styles.avatar}
        />
        <Text style={styles.title}>{caption.username}</Text>
      </View>
    </View>
  );
};

const Friends = () => {

  const renderFriend = ({ item }) => (
    <FriendItem caption={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.captionBox}>
        <FlatList //this is like map
          data={DATA}
          renderItem={renderFriend}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#f9c2ff',
  },
  // captionBox: {
  //   backgroundColor: '#f9c2ff',
  // },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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

export default Friends;
