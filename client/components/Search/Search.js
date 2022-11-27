import React, {useState, useEffect} from 'react';
import {Image, View, Platform, TouchableOpacity, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TextInput} from 'react-native';
import { Avatar, VStack } from '@react-native-material/core';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

var DATA = [
  {
    id: 1234567,
    username: 'thisGuy',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
    friends: ['thisGuy2', 'thisGuy3']
  },
  {
    id: 1234568,
    username: 'thisGuy2',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234569,
    username: 'thisGuy3',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234570,
    username: 'thisGuy4',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234571,
    username: 'thisGuy5',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234572,
    username: 'thisGuy6',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234573,
    username: 'thisGuy7',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234574,
    username: 'thisGuy8',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234575,
    username: 'thisGuy9',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234576,
    username: 'thisGuy10',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
  {
    id: 1234577,
    username: 'thisGuy11',
    usericon: 'https://mui.com/static/images/avatar/2.jpg',
  },
];

export default function Search() {

  // const queryClient = useQueryClient()
  // const {get, add} = useFriends();
  // const {isLoading: useFriendsGetIsLoading, data: friends} = get;
  const [ users, setUsers ] = useState(DATA);
  const [ filteredUsers, setFilteredUsers ] = useState();
  const [ searchInput, setSearchInput ] = useState();

  useEffect(() => {
    axios.getAll('https://famous-eggs-sell-75-80-43-25.loca.lt/users')
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      });
  }, []);


  const handleSearch = (e, input) => {
    let searchResults = users.filter((user) => {
      return user.username.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredUsers(searchResults);
  };

  // const handleAdd = () => {

  // };

  const UserItem = ({user}) => {
    return (
      <View style={styles.item}>
        <View style={styles.userInfo}>
          <View style={styles.avatarView}>
            <Avatar image={{ uri: 'https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png' }}
              size={35}
              styles={styles.avatar}/>
            <Text style={styles.text}>{user.username}</Text>
          </View>
          <View>
            <Ionicons style={styles.icon} name="ios-person-add-outline" size={15} color="#FF842B" /*onPress={handleAdd}*//>
          </View>
        </View>
      </View>
    );
  };

  const renderSearchedUsers = ({item}) => {
    return (
      <UserItem user={item}/>
    );
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder='Search' placeholderTextColor='#D3D3D3'
            onChangeText={text => setSearchInput(text)} onSubmitEditing={(e) => handleSearch(e, searchInput)}
            enablesReturnKeyAutomatically/>
        </View>
        <View style={styles.listContainer}>
          <VStack spacing={7} divider={true} w={'100%'}>
            <FlatList
              data={filteredUsers}
              renderItem={renderSearchedUsers}
              keyExtractor={item => item.id}
            />
          </VStack>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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