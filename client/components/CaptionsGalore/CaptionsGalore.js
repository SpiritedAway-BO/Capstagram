import React, { useState, useEffect, useRef, useContext } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, StatusBar, SafeAreaView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { AntDesign, Ionicons, Octicons, Entypo } from '@expo/vector-icons';
import { Stack, AppBar, IconButton, HStack, Button } from '@react-native-material/core';
import { auth } from '../Auth/firebase/firebase.js';
import CaptionItem from './CaptionItem.js';
import { AppContext } from '../../contexts/AppContext.js';
import axios from 'axios';
import { LOCALTUNNEL } from '../Auth/firebase/config.js';


const CaptionsGalore = () => {
  const [allCaptions, setAllCaptions] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { currentPost, setCurrentPost, setMainFeedData } = useContext(AppContext);
  const [newCaption, setNewCaption] = useState('');
  const [photoObject, setPhotoObject] = useState('6382cd1905e5b94830a216bf');
  const [captionArray, setCaptionArray] = useState([]);

  const renderCaption = ({ item }) => (
    <CaptionItem caption={item} />
  );

  useEffect(() => {
    getCaptions();
  }, []);

  const getCaptions = () => {
    if (currentPost.id) {
      axios.get(`${LOCALTUNNEL}/captions/${currentPost.id}`)
        .then(results => {
          setCaptionArray(results.data);
        })
        .catch(err => console.log('error in caption get'));
    }
  };

  // console.log('current post', currentPost.id);
  // console.log('current post', currentUser.uid);


  const handleCaptionSubmit = () => {
    // console.log('currentUser', currentUser)
    /***** REPLACE PHOTOID WITH USER SELECTED PHOTOID */
    /** make a default for if usename is null */
    console.log(currentPost.id, currentUser.uid, newCaption)
    axios.post(`${LOCALTUNNEL}/captions`, { photoId: currentPost.id, userId: currentUser.uid, body: newCaption })
      .then(results => {
        getCaptions(); //helper function
        // RE-RENDER MAIN FEED
        axios.get(`${LOCALTUNNEL}/photos/${currentUser.uid}`)
          .then(res => {
            setMainFeedData(res.data);
          })
          .catch(err => console.log('error in re-rendering main feed in captions galore', err));
      })
      .then(results => console.log('posted new caption'))
      .catch(err => console.log('errors in captions galore'));
    setNewCaption(''); //reset
  }
  // console.log('captionArray', captionArray);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList //this is like map
        data={captionArray}
        renderItem={renderCaption}
        keyExtractor={item => item.id}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.newCommentView}>
            <TextInput style={styles.newComment} value={newCaption} onChangeText={newCaption => setNewCaption(newCaption)} placeholder="Add a new caption..." />
            <Button style={styles.newCommentButton} accessibilityLabel="Post a New caption button" title="Post" color="9D4EDD" onPress={handleCaptionSubmit} />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
