import React from 'react';
import UploadPhoto from './UploadPhoto.js';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AccountPage() {
  return (
    <View style={AccountPageStyles.AccountPageContainer}>
      <UploadPhoto />
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
  },
});