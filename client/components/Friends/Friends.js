import React, {useState, useEffect} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';



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
},
{
  id: 1234573,
  username: 'thisGuy7',
  usericon: '../../assets/favicon.png',

},
{
  id: 1234574,
  username: 'thisGuy8',
  usericon: '../../assets/favicon.png',

},
{
  id: 1234575,
  username: 'thisGuy9',
  usericon: '../../assets/favicon.png',

},
{
  id: 1234576,
  username: 'thisGuy10',
  usericon: '../../assets/favicon.png',

},
{
  id: 1234577,
  username: 'thisGuy11',
  usericon: '../../assets/favicon.png',

},
];

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
      <FlatList //this is like map
        data={DATA}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
      />
      <View style={styles.bottomBarView}>
        <AppBar
          variant="bottom"
          color="black"
          leading={props => (
            <HStack spacing={80}>
              <IconButton icon={props => <Entypo name="home" size={28} color="white" />}{...props} />
              <IconButton icon={props => <AntDesign name="search1" size={28} color="white" />}{...props} />
            </HStack>
          )}
          trailing={props => (
            <HStack spacing={80}>
              <IconButton icon={props => <AntDesign name="user" size={28} color="white" />}{...props} />
              <IconButton icon={props => <Entypo name="dots-three-vertical" size={28} color="white" />}{...props} />
            </HStack>
          )}
          style={styles.bottomAppBar}
        />
      </View>
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
    padding: 20,

  },
  title: {
    fontSize: 24,
    paddingHorizontal: 5,
    height: '100%',
  },
  avatar: {
    borderRadius: '50%',
  },
  bottomBarView: {
    width: '100%',
  },
});

export default Friends;
