import React, { useState, useContext } from 'react';
import UploadPhoto from './UploadPhoto.js';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth, signOutUser } from '../Auth/firebase/firebase.js';
import { VStack } from '@react-native-material/core';
import { MaterialIcons } from '@expo/vector-icons';


export default function AccountPage({ navigation }) {

  const [photo, setPhoto] = useState('https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png');

  const handleSignOut = () => {
    signOutUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };

  // console.log('auth info', auth.currentUser.displayName, auth.currentUser.uid, auth.currentUser);

  return (
    <View style={AccountPageStyles.AccountPageContainer}>
      <UploadPhoto photo={photo} setPhoto={setPhoto} />
      <VStack spacing={7} divider={true} w={'82.5%'}>
        <View style={AccountPageStyles.infoContainer}>
          <View>
            <Text style={AccountPageStyles.label}>Username:</Text>
            <Text style={AccountPageStyles.input}>{auth.currentUser.displayName}</Text>
          </View>
          <MaterialIcons name="edit" size={18} color="black" />
        </View>
        <View style={AccountPageStyles.infoContainer}>
          <View>
            <Text style={AccountPageStyles.label}>Name:</Text>
            <Text style={AccountPageStyles.input}>Set Name</Text>
          </View>
          <MaterialIcons name="edit" size={18} color="black" />
        </View>
        <View style={AccountPageStyles.infoContainer}>
          <View>
            <Text style={AccountPageStyles.label}>Bio:</Text>
            <Text style={AccountPageStyles.input}>Set Bio</Text>
          </View>
          <MaterialIcons name="edit" size={18} color="black" />
        </View>
        <View style={AccountPageStyles.infoContainer}>
          <View>
            <Text style={AccountPageStyles.label}>email:</Text>
            <Text style={AccountPageStyles.input}>{auth.currentUser.email}</Text>
          </View>
          <MaterialIcons name="edit" size={18} color="black" />
        </View>
      </VStack>
      <TouchableOpacity style={AccountPageStyles.btnWrapper} onPress={handleSignOut}>
        <Text style={AccountPageStyles.logoutBtn}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const AccountPageStyles = StyleSheet.create({
  AccountPageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  btnWrapper: {
    width: '75%',
    alignItems: 'center',
    paddingVertical: 17,
    backgroundColor: '#FF842B',
    borderRadius: 6,
  },
  logoutBtn: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'red',
  },
  label: {
    fontSize: 12,
    color: 'grey'
  },
  input: {
    fontSize: 17
  },
});