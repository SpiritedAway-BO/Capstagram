import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadPhoto() {
  const [photo, setPhoto] = useState('https://res.cloudinary.com/cwhrcloud/image/upload/v1669246271/orange_auy0ff.png');

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
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
      <View style={photoUploaderStyles.cardContainer}>
        <Image source={{ uri: photo }} style={{ width: 185, height: 175, marginLeft: 35, marginTop: 30 }} />
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
    height: 250,
    width: 250,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  cardContainer: {
    width: '95%',
    borderRadius: 12,
    background: '#F5F5F5',
    position: 'relative',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'relative',
    bottom: -3,
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