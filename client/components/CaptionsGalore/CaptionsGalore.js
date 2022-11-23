import React, {useState, useEffect} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';


var DATA = [{
  id: 1234567,
  username: 'thisGuy',
  caption: 'It\'s the little things in life',
  upvotes: 5,
  usericon: '../../assets/favicon.png',
  voted: true,
  timestamp: Date(),
},
{
  id: 1234568,
  username: 'thisGuy2',
  caption: 'Let me show you my Pokemon!',
  upvotes: 15,
  usericon: '../../assets/favicon.png',
  voted: false,
  timestamp: Date(),

},
{
  id: 1234569,
  username: 'thisGuy3',
  caption: 'Are we there yet?',
  upvotes: 0,
  usericon: '../../assets/favicon.png',
  voted: false,
  timestamp: Date(),

},
{
  id: 1234570,
  username: 'thisGuy4',
  caption: 'Let me show you the world!',
  upvotes: 33,
  usericon: '../../assets/favicon.png',
  voted: true,
  timestamp: Date(),

},
{
  id: 1234571,
  username: 'thisGuy5',
  caption: 'All your base are belongs to us!',
  upvotes: 2,
  usericon: '../../assets/favicon.png',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234572,
  username: 'thisGuy6',
  caption: 'I can haz cheezburger?',
  upvotes: 4,
  usericon: '../../assets/favicon.png',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234573,
  username: 'thisGuy7',
  caption: 'Momma said there\'d be days like this...',
  upvotes: 12,
  usericon: '../../assets/favicon.png',
  voted: false,
  timestamp: Date(),
},
];

const CaptionItem = ({ caption }) => {
  const [voted, setVoted] = useState(caption.voted);
  const [votes, setVotes] = useState(caption.upvotes);

  useEffect(() => {
    setVotes(caption.upvotes); //takes care of asynchronous state setting
  }, []);

  /* will need to send put/patch state to database, or somehow keep track of uservotes and also specifically THIS user's vote */

  return (
    <View style={styles.item}>
      <View style={styles.userInfo} >
        <Avatar image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
          size={35}
          style={styles.avatar}
        />
        <Text style={styles.title}>{caption.username}</Text>
      </View>
      <Text style={styles.title}>{caption.caption}</Text>
      { voted ?
        <View style={styles.heartIcon} >
          <Text style={styles.title}>{votes}</Text>
          <Ionicons name="ios-heart" size={30} color="#FF842B"
            onPress={() => {
              setVotes(votes - 1);
              setVoted(!voted);
            }}/>
        </View> :
        <View style={styles.heartIcon} >
          <Text style={styles.title} >{votes}</Text>
          <Ionicons style={styles.heartIcon} name="ios-heart-outline" size={30} color="#FF842B"
            onPress={() => {
              setVotes(votes + 1);
              setVoted(!voted);
            }}
          />
        </View>}
    </View>
  );
};

const CaptionsGalore = () => {

  const renderCaption = ({ item }) => (
    <CaptionItem caption={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={DATA}
        renderItem={renderCaption}
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

export default CaptionsGalore;
