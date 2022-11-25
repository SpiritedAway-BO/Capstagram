import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadPhoto() {
  const [photo, setPhoto] = useState('https://res.cloudinary.com/cwhrcloud/image/upload/v1669161707/orange_hhc8pc.png');

  useEffect(() => {
    // checkForCameraPermission();
  }, []);

  // const checkForCameraPermission = async () => {
  //   const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('Please grant camera roll permissions inside your system\'s settings');
  //   } else {
  //     console.log('Media Permissions are granted');
  //   }
  // };

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    console.log(JSON.stringify(_photo));
    if (!_photo.canceled) {
      setPhoto(_photo.assets[0].uri);
    }
  };

  return (
    <View style={photoUploaderStyles.container}>
      <ImageBackground source={{ uri: photo }} style={photoUploaderStyles.image}>
        <View style={photoUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity onPress={addPhoto} style={photoUploaderStyles.uploadBtn}>
            <Text>{photo ? 'Edit' : 'Upload'}</Text>
            <Entypo name='camera' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const photoUploaderStyles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    backgroundColor: '#EFEFEF',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    width: '100%',
    height: '22.5%',
    opacity: 0.7,
    backgroundColor: 'lightgrey',
  },
  uploadBtn: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  }
});