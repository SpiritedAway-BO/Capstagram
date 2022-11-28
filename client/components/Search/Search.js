import React, { useState, useEffect, useContext } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TextInput, SafeAreaView} from 'react-native';
import { Avatar, VStack } from '@react-native-material/core';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../components/Auth/firebase/firebase';
import { AppContext } from '../../contexts/AppContext';
import axios from 'axios';
import { LOCALTUNNEL } from '../Auth/firebase/config.js';

export default function Search() {

  // const queryClient = useQueryClient()
  // const {get, add} = useFriends();
  // const {isLoading: useFriendsGetIsLoading, data: friends} = get;
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState();
  const [searchInput, setSearchInput] = useState();
  const { friends, setFriends } = useContext(AppContext);
  const { mainFeedData, setMainFeedData } = useContext(AppContext);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [tryThis, setTryThis] = useState(null);
  let friendsArr = [];

  useEffect(() => {
    axios.get(`${LOCALTUNNEL}/users`)
      .then((res) => {
        console.log('friends', friends);
        setUsers(res.data);
        setFilteredUsers(res.data);
      });
  }, []);

  useEffect(() => {
    friends.forEach((user) => {
      friendsArr.push(user.username);
    });
    setTryThis(friendsArr);
    console.log(friendsArr);
  }, [friends]);


  const handleSearch = (e, input) => {
    let searchResults = users.filter((user) => {
      return user.username.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredUsers(searchResults);
  };

  const handleAdd = (user) => {
    // console.log(auth.currentUser.uid);
    // console.log(user.id);
    friendsArr.push(user.username);
    setFriends([...friends, user]);

    axios.post(`${LOCALTUNNEL}/user/friends`, {firebaseID: auth.currentUser.uid, friendID: user.id })
      .then(() => {
        console.log('added:', user.id);
        axios.get(`${LOCALTUNNEL}/photos/${currentUser.uid}`)
          .then(res => {
            setMainFeedData(res.data);
          })
          .catch(err => console.log('error updating main feed with friend', err));
      })
      .catch(err => console.log(err));
  };

  const UserItem = ({ user }) => {
    return (
      <View style={styles.item}>
        <View style={styles.userInfo}>
          <View style={styles.avatarView}>
            <Avatar image={{ uri: user.profilePicURI }}
              size={35}
              styles={styles.avatar} />
            <Text style={styles.text}>{user.username}</Text>
          </View>
          {tryThis.includes(user.username) ?
            <View>
              <Ionicons style={styles.icon} name="ios-person-add-sharp" size={20} color="#FF842B" onPress={() => handleAdd(user)} />
            </View> :
            <View>
              <Ionicons style={styles.icon} name="ios-person-add-outline" size={20} color="#FF842B" onPress={() => handleAdd(user)} />
            </View>}
        </View>
      </View>
    );
  };

  const renderSearchedUsers = ({ item }) => {
    return (
      <UserItem user={item} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding" >
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder='Search' placeholderTextColor='#D3D3D3'
              onChangeText={text => setSearchInput(text)} onSubmitEditing={(e) => handleSearch(e, searchInput)}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={styles.listContainer}>
        <VStack spacing={7} divider={true} w={'100%'}>
          <FlatList
            data={filteredUsers}
            renderItem={renderSearchedUsers}
            keyExtractor={item => item.id}
          />
        </VStack>
      </View>
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({
  inputContainer: {
    width: '95%',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 0,
    borderRadius: 12,
    // backgroundColor: '#B19CD9',
    marginLeft: 8
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 6,
    height: 50,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    fontSize: 16,
    // marginBottom: 14
  },
  container: {
    flex: 1,
    width: "100%"
  },
  avatarView: {
    flexDirection: 'row'
  },
  avatar: {
    borderRadius: '50%',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#D6D6D6',
    marginBottom: 2
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    height: '100%',
  }
});