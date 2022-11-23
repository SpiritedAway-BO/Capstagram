import React from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
//import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useFriends from '../../hooks/useFriends.js';

export default function Search() {

  //const queryClient = useQueryClient()
  //const {get, add} = useFriends();
  //const {isLoading: useFriendsGetIsLoading, data: friends} = get;
  const { users, setUsers } = useState();
  const { filteredUsers, setFilteredUsers} = useState();
  const { searchInput, setSearchInput} = useState();

  useEffect(() => {
    axios.get('localhost:3000/users')
      .then(results => setUsers(results));
  });


  const handleSearch = (input) => {

  };

  if (useFriendsGetIsLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Hello</Text>
      {/* {friends.map((friend) => (
        <View>
          <Text>{friend.name}</Text>
        </View>
      ))} */}
      {/* <Button onClick={(data) => useFriendsAddMutate(data)}>Add a friend!</Button> */}
    </View>
  );
}