import React, {useState, useEffect, useRef} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, Avatar, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';


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
  caption: 'I can show you the world!',
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
  const newCaption = useRef('');
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
  );
};

const CaptionsGalore = () => {

  const renderCaption = ({ item }) => (
    <CaptionItem caption={item} />
  );

  // const newCaption = useRef();
  const [newCaption, setNewCaption] = useState('');

  // useEffect(() => {
  //   setVotes(caption.upvotes); //takes care of asynchronous state setting
  // }, []);

  const handleCaptionSubmit = () => {
    console.log('newCaption', newCaption);
    //put caption
    setNewCaption(''); //reset
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={DATA}
        renderItem={renderCaption}
        keyExtractor={item => item.id}
      />
      {/* <View style={styles.newComment}> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.newCommentView}>
            <TextInput style={styles.newComment} value={newCaption} onChangeText={newCaption => setNewCaption(newCaption)} placeholder="Add a new caption..." />
            <Button style={styles.newCommentButton} accessibilityLabel="Post a New caption button" title="Post" color="9D4EDD" onPress={handleCaptionSubmit}/>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  captionIntro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingBottom: 20,
    // backgroundColor: 'blue',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
    // alignItems: 'center',
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
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  title: {
    fontSize: 20,
    paddingHorizontal: 5,
  },
  votes: {
    paddingRight: 3,
  },
  username: {
   justifyContent: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  newComment: {
    position: 'sticky',
    bottom: 0,
    fontSize: 20,
    width: `100%`,
    height: 46,
    borderWidth: 2,
    borderColor: '#d6d6d6',
    width: `60%`,
    marginLeft: 30,
  },
  newCommentView: {
    height: 56,
    justifyContent: 'space-around',
    alignItems: 'space-around',
    flexDirection: 'row',
  },
  newCommentButton: {
    height: 46,
    width: 'auto',
    backgroundColor: `#9D4EDD`,
    justifyContent: 'space-around',
  },
  avatar: {
    borderRadius: '50%',
  },
});

export default CaptionsGalore;
