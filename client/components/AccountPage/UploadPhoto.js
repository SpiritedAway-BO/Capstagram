import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
      <View style={photoUploaderStyles.cardContainer}>
        <Image source={{ uri: photo }} style={{ width: 150, height: 150, marginLeft: 40, marginTop: 20 }} />
        <View style={photoUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity onPress={addPhoto} style={photoUploaderStyles.uploadBtn}>
            <Text>{photo ? 'Edit' : 'Upload'}</Text>
            <Entypo name='camera' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const photoUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  cardContainer: {
    width: '95%',
    borderRadius: 12,
    background: '#F5F5F5',
    position: "relative",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'relative',
    right: 0,
    bottom: 20,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});