import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadPhoto() {
  const [photo, setPhoto] = useState('https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png');

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    console.log(JSON.stringify(_photo));
    if (!_photo.canceled) {
      const uri = _photo.assets[0].uri;
      const type = _photo.assets[0].type;
      const name = _photo.assets[0].fileName;
      const source = {
        uri,
        type,
        name,
      };
      console.log('Photo', source);
      cloudinaryUpload(source);
    }
  };

  const cloudinaryUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'uw_blueocean');
    data.append('cloud_name', 'cwhrcloud');
    fetch('https://api.cloudinary.com/v1_1/cwhrcloud/upload', {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        console.log('response data', data);
        setPhoto(data.secure_url);
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
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