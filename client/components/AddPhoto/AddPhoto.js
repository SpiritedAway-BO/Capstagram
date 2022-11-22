import React, { useState } from 'react';
import { Image, View, Dimensions, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import cloudinary from 'cloudinary';
// import { createCloudinaryWidget } from '../../tools/cloudWidget.js';

export default function AddPhoto() {

  const [postPhoto, setPostPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

  const addPhoto = async () => {
    let _photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!_photo.canceled) {
      console.log('chosen photo', _photo);
      const uri = _photo.assets[0].uri;
      const type = _photo.assets[0].type;
      const name = _photo.assets[0].fileName;
      const source = {
        uri,
        type,
        name,
      };
      console.log('photo', _photo);
      // cloudinaryUpload(source);
      setPostPhoto(uri);
    }
    // if (!_photo.canceled) {
    //   setPhoto(_photo.assets[0].uri);
    // }
  };

  const cloudinaryUpload = (photo) => {
    console.log(photo);

    // const pls = createCloudinaryWidget((url) => {
    //   setPostPhoto(url);
    // });

    // console.log(pls);

    // const data = new FormData();
    // data.append('file', photo);
    // data.append('upload_preset', 'uw_blueocean');
    // data.append('cloud_name', 'cwhrcloud');
    // fetch('https://api.cloudinary.com/v1_1/cwhrcloud', {
    //   method: 'post',
    //   body: data
    // }).then(res => res.json()).
    //   then(data => {
    //     setPostPhoto(photo.uri);
    //     console.log('data', data);
    //   }).catch(err => {
    //     console.log(err);
    //     Alert.alert('An Error Occured While Uploading');
    //   });
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: postPhoto }}
          style={styles.backgroundImage}>
        </Image>
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>
          ImagePicker to Cloudinary
        </Text>
        <TouchableOpacity onPress={addPhoto} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>

    </View >
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height - 90
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center'
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
  }
});