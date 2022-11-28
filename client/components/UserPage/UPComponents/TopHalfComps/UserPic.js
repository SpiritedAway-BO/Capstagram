import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from '@react-native-material/core';

const UserPic = ({myPosts}) => {
  let uri = myPosts.profilePicURI;
  console.log("MY POSTS IN USERPIC", myPosts);
  return (

      <Avatar
        style={styles.avatar}
        image={{ uri: uri }}
        size={80}
      />

      // <Avatar
      //   style={styles.avatar}
      //   src='../BottomHalfComps/orange.png'
      //   // image={{ uri: 'https://mui.com/static/images/avatar/1.jpg' }}
      //   size={80}
      // />


  );
};

const styles = StyleSheet.create({
  avatar: {
    marginLeft: '-5%',
    marginTop: '0%',
    marginBottom: '0%',
  },
});

export default UserPic;