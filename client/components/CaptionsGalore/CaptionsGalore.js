import React from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Stack, Avatar } from '@react-native-material/core';


var DATA = [{
  id: 1234567,
  username: 'thisGuy',
  caption: 'It\'s the little things in life',
  upvotes: 5,
  usericon: '../../assets/favicon.png',
  voted: true,
  timestamp: Date()
},
{
  id: 1234568,
  username: 'thisGuy2',
  caption: 'Let me show you my Pokemon!',
  upvotes: 15,
  usericon: '../../assets/favicon.png',
  voted: false
},
{
  id: 1234569,
  username: 'thisGuy3',
  caption: 'Are we there yet?',
  upvotes: 0,
  usericon: '../../assets/favicon.png',
  voted: false
},
{
  id: 1234570,
  username: 'thisGuy4',
  caption: 'Let me show you the world!',
  upvotes: 3,
  usericon: '../../assets/favicon.png',
  voted: false
},
{
  id: 1234571,
  username: 'thisGuy5',
  caption: 'All your base are belongs to us!',
  upvotes: 2,
  usericon: '../../assets/favicon.png',
  voted: false
},
{
  id: 1234572,
  username: 'thisGuy6',
  caption: 'I can haz cheezeburger?',
  upvotes: 4,
  usericon: '../../assets/favicon.png',
  voted: false
}];

const CaptionItem = ({ caption }) => (
  <View style={styles.item}>
    <View style={styles.userInfo} >
      <Avatar image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
        size={35}
        style={styles.avatar}
      />
      <Text style={styles.title}>{caption.username}</Text>
    </View>
    <Text style={styles.title}>{caption.caption}</Text>
    { caption.voted ?
      <View style={styles.heartIcon}>
        <Text style={styles.title}>{caption.upvotes}</Text>
        <Ionicons name="ios-heart" size={35} color="#FF842B" />
      </View> :
      <View style={styles.heartIcon}>
        <Text style={styles.title}>{caption.upvotes}</Text>
        <Ionicons style={styles.heartIcon} name="ios-heart-outline" size={35} color="#FF842B" />
      </View>}
  </View>
);

const CaptionsGalore = () => {

  const renderCaption = ({ item }) => (
    <CaptionItem caption={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.captionBox}>
        <FlatList //this is like map
          data={DATA}
          renderItem={renderCaption}
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
  captionBox: {
    backgroundColor: '#f9c2ff',
    // padding: 20,
    margin: 20,
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
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 5,
  },
  avatar: {
    borderRadius: '50%',
  },

});

export default CaptionsGalore;
