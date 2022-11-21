import React from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import useFriends from '../../hooks/useFriends.js';

export default function Search() {
  const {{isLoading: useFriendsGetIsLoading}, {data: friends}} = useFriends.get();
  const {{isLoading: useFriendsAddIsLoading}, isSuccess, isFailure, {mutate: useFriendsAddMutate}} = useFriends.add();

  if (useFriendsGetIsLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
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