import React from 'react';
import UploadPhoto from './UploadPhoto.js';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function UserPage() {
  return (
    <View style={userPageStyles.userPageContainer}>
      <UploadPhoto />
    </View>
  );
};

const userPageStyles = StyleSheet.create({
  userPageView: {
    width: '100%',
    height: 45,
  },
  userPageContainer: {
    width: '100%',
  },
});