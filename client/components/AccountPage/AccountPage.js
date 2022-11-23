import React from 'react';
import UploadPhoto from './UploadPhoto.js';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth, signOutUser} from '../Auth/firebase/firebase.js';

export default function AccountPage({navigation}) {

  const handleSignOut = () => {
    signOutUser();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}]
    });
  };

  return (
    <View style={AccountPageStyles.AccountPageContainer}>
      <UploadPhoto />
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const AccountPageStyles = StyleSheet.create({
  AccountPageView: {
    width: '100%',
    height: 45,
  },
  AccountPageContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
  },
});