import React, {useState, useEffect, useRef, useContext} from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard} from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo} from '@expo/vector-icons';
import { Stack, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';
import CaptionItem from './CaptionItem.js';
import { AppContext}  from '../../contexts/AppContext.js';
import axios from 'axios';



var DATA = [{
  id: 1234567,
  username: 'thisGuy',
  caption: 'It\'s the little things in life',
  upvotes: 5,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: true,
  timestamp: Date(),
},
{
  id: 1234568,
  username: 'thisGuy2',
  caption: 'Let me show you my Pokemon!',
  upvotes: 15,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: false,
  timestamp: Date(),

},
{
  id: 1234569,
  username: 'thisGuy3',
  caption: 'Are we there yet?',
  upvotes: 0,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: false,
  timestamp: Date(),

},
{
  id: 1234570,
  username: 'thisGuy4',
  caption: 'I can show you the world!',
  upvotes: 33,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: true,
  timestamp: Date(),

},
{
  id: 1234571,
  username: 'thisGuy5',
  caption: 'All your base are belongs to us!',
  upvotes: 2,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234572,
  username: 'thisGuy6',
  caption: 'I can haz cheezburger?',
  upvotes: 4,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234573,
  username: 'thisGuy7',
  caption: 'Momma said there\'d be days like this...',
  upvotes: 12,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: false,
  timestamp: Date(),
},
{
  id: 1234574,
  username: 'thisGuy7',
  caption: 'Whodunnit',
  upvotes: 12,
  usericon: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png',
  voted: false,
  timestamp: Date(),
},
];

const CaptionsGalore = () => {
  const [allCaptions, setAllCaptions] = useState([]);
  const {username, setUserName} = useContext(AppContext);
  const {currentUser, setCurrentUser} = useContext(AppContext);
  const [newCaption, setNewCaption] = useState('');

  // get all captions for this photo
  // useEffect(() => (
  // axios.get('https://angry-pets-cheer-173-228-53-12.loca.lt/captions', {body: {photoID: }})

  // ), [])

  const renderCaption = ({ item }) => (
    <CaptionItem caption={item} />
  );

  const handleCaptionSubmit = () => {


    // console.log('auth', auth.currentUser.uid);
    //put caption to database
    setNewCaption(''); //reset
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={DATA}
        renderItem={renderCaption}
        keyExtractor={item => item.id}
        />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.newCommentView}>
          <TextInput style={styles.newComment} value={newCaption} onChangeText={newCaption => setNewCaption(newCaption)} placeholder="Add a new caption..." />
          <Button style={styles.newCommentButton} accessibilityLabel="Post a New caption button" title="Post" color="9D4EDD" onPress={handleCaptionSubmit}/>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {/* {console.log('currentUser context', currentUser.uid)} */}
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
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'space-between',
  },
  heartIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingleft: 2,
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
    borderTopWidth: 2,
    borderColor: '#d6d6d6',

  },
  newCommentButton: {
    height: 46,
    width: 'auto',
    backgroundColor: `#9D4EDD`,
    justifyContent: 'space-around',
  },
});

export default CaptionsGalore;
