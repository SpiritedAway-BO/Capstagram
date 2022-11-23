import React from 'react';
import UploadPhoto from './UploadPhoto.js';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth, signOutUser } from '../Auth/firebase/firebase.js';

export default function AccountPage({ navigation }) {

  const handleSignOut = () => {
    signOutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };

  return (
    <View style={AccountPageStyles.AccountPageContainer}>
      <UploadPhoto />
      <TouchableOpacity style={AccountPageStyles.btnWrapper} onPress={handleSignOut}>
        <Text style={AccountPageStyles.logoutBtn}>Log Out</Text>
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
    height: '100%',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#B19CD9',
  },
  btnWrapper: {
    width: '80%',
    alignItems: 'center',
    marginTop: 300,
    paddingVertical: 20,
    backgroundColor: '#FFB347',
    borderRadius: 6,
  },
  logoutBtn: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700'
  },
});